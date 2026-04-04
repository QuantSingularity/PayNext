# Main entry point for Terraform configuration
# This file orchestrates all infrastructure components for PayNext

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  availability_zones = length(var.availability_zones) > 0 ? var.availability_zones : slice(data.aws_availability_zones.available.names, 0, 3)

  common_tags = merge(
    {
      Project     = "PayNext"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = var.owner
      CostCenter  = var.cost_center
    },
    var.additional_tags
  )
}

module "security" {
  source = "./modules/security"

  environment              = var.environment
  kms_key_deletion_window  = var.kms_key_deletion_window
  enable_secrets_manager   = var.enable_secrets_manager
  enable_waf               = var.enable_waf
  enable_security_hub      = var.enable_security_hub
  enable_config            = var.enable_config
  security_contact_email   = var.security_contact_email
  compliance_contact_email = var.compliance_contact_email
  dr_region                = var.dr_region

  tags = local.common_tags
}

module "vpc" {
  source = "./modules/vpc"

  vpc_cidr              = var.vpc_cidr
  private_subnet_cidrs  = var.private_subnet_cidrs
  public_subnet_cidrs   = var.public_subnet_cidrs
  database_subnet_cidrs = var.database_subnet_cidrs
  availability_zones    = local.availability_zones
  environment           = var.environment
  enable_vpc_flow_logs  = var.enable_vpc_flow_logs
  enable_multi_az       = var.enable_multi_az
  allowed_cidr_blocks   = var.allowed_cidr_blocks
  kms_key_id            = module.security.kms_key_arn

  tags = local.common_tags
}

module "monitoring" {
  source = "./modules/monitoring"

  environment              = var.environment
  enable_cloudtrail        = var.enable_cloudtrail
  enable_guardduty         = var.enable_guardduty
  enable_config            = var.enable_config
  log_retention_days       = var.log_retention_days
  data_retention_days      = var.data_retention_days
  security_contact_email   = var.security_contact_email
  compliance_contact_email = var.compliance_contact_email
  vpc_id                   = module.vpc.vpc_id
  kms_key_id               = module.security.kms_key_arn
  s3_bucket_id             = module.storage.s3_bucket_id

  tags = local.common_tags
}

module "storage" {
  source = "./modules/storage"

  providers = {
    aws.dr_region = aws.dr_region
  }

  environment                     = var.environment
  vpc_id                          = module.vpc.vpc_id
  private_subnet_ids              = module.vpc.private_subnet_ids
  security_group_ids              = module.vpc.security_group_ids
  kms_key_id                      = module.security.kms_key_arn
  data_retention_days             = var.data_retention_days
  backup_retention_days           = var.backup_retention_days
  replication_destination_region  = var.dr_region
  enable_cross_region_replication = var.enable_cross_region_backup

  tags = local.common_tags
}

module "kubernetes" {
  source = "./modules/kubernetes"

  cluster_name               = var.cluster_name
  environment                = var.environment
  vpc_id                     = module.vpc.vpc_id
  private_subnet_ids         = module.vpc.private_subnet_ids
  public_subnet_ids          = module.vpc.public_subnet_ids
  enable_encryption_at_rest  = var.enable_encryption_at_rest
  enable_detailed_monitoring = var.enable_detailed_monitoring
  kms_key_id                 = module.security.kms_key_arn
  security_group_ids         = module.vpc.security_group_ids

  tags = local.common_tags
}

module "database" {
  source = "./modules/database"

  providers = {
    aws.dr_region = aws.dr_region
  }

  environment                = var.environment
  vpc_id                     = module.vpc.vpc_id
  database_subnet_ids        = module.vpc.database_subnet_ids
  database_subnet_group_name = module.vpc.database_subnet_group_name
  enable_encryption_at_rest  = var.enable_encryption_at_rest
  enable_multi_az            = var.enable_multi_az
  backup_retention_days      = var.backup_retention_days
  enable_cross_region_backup = var.enable_cross_region_backup
  kms_key_id                 = module.security.kms_key_arn
  security_group_ids         = module.vpc.security_group_ids
  secrets_manager_arn        = module.security.secrets_manager_arn

  tags = local.common_tags
}

# Service Modules - Microservices deployed on EKS
module "api_gateway" {
  source = "./services/api-gateway"

  cluster_name        = module.kubernetes.cluster_name
  environment         = var.environment
  namespace           = "paynext"
  replica_count       = var.environment == "prod" ? 3 : 2
  secrets_manager_arn = module.security.secrets_manager_arn
  eureka_server_url   = "http://eureka-server:8001/eureka"

  tags = local.common_tags

  depends_on = [module.kubernetes, module.security]
}

module "eureka_server" {
  source = "./services/eureka-server"

  cluster_name  = module.kubernetes.cluster_name
  environment   = var.environment
  namespace     = "paynext"
  replica_count = var.environment == "prod" ? 2 : 1

  tags = local.common_tags

  depends_on = [module.kubernetes]
}

module "notification_service" {
  source = "./services/notification-service"

  cluster_name        = module.kubernetes.cluster_name
  environment         = var.environment
  namespace           = "paynext"
  replica_count       = var.environment == "prod" ? 3 : 2
  secrets_manager_arn = module.security.secrets_manager_arn
  eureka_server_url   = "http://eureka-server:8001/eureka"

  tags = local.common_tags

  depends_on = [module.kubernetes, module.eureka_server, module.security]
}

module "payment_service" {
  source = "./services/payment-service"

  cluster_name        = module.kubernetes.cluster_name
  environment         = var.environment
  namespace           = "paynext"
  replica_count       = var.environment == "prod" ? 3 : 2
  secrets_manager_arn = module.security.secrets_manager_arn
  eureka_server_url   = "http://eureka-server:8001/eureka"

  tags = local.common_tags

  depends_on = [module.kubernetes, module.eureka_server, module.database, module.security]
}

module "user_service" {
  source = "./services/user-service"

  cluster_name        = module.kubernetes.cluster_name
  environment         = var.environment
  namespace           = "paynext"
  replica_count       = var.environment == "prod" ? 3 : 2
  secrets_manager_arn = module.security.secrets_manager_arn
  eureka_server_url   = "http://eureka-server:8001/eureka"

  tags = local.common_tags

  depends_on = [module.kubernetes, module.eureka_server, module.database, module.security]
}
