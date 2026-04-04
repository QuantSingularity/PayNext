terraform {
  required_version = ">= 1.5.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.20"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.10"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  # Backend configuration for remote state management
  # Uncomment and configure for production:
  # backend "s3" {
  #   bucket         = "paynext-terraform-state-ENVIRONMENT"
  #   key            = "infrastructure/terraform.tfstate"
  #   region         = "us-west-2"
  #   encrypt        = true
  #   dynamodb_table = "paynext-terraform-locks"
  #   kms_key_id     = "arn:aws:kms:REGION:ACCOUNT:key/KEY-ID"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "PayNext"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "PayNext-DevOps"
      CostCenter  = "Engineering"
    }
  }
}

provider "aws" {
  alias  = "dr_region"
  region = var.dr_region

  default_tags {
    tags = {
      Project     = "PayNext"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "PayNext-DevOps"
      CostCenter  = "Engineering"
      Purpose     = "DisasterRecovery"
    }
  }
}

# Use data source for EKS auth to avoid chicken-and-egg provider issue
# These providers require the EKS cluster to exist first.
# Run: terraform apply -target=module.kubernetes before using these providers.
data "aws_eks_cluster" "paynext" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "paynext" {
  name = var.cluster_name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.paynext.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.paynext.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.paynext.token
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.paynext.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.paynext.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.paynext.token
  }
}
