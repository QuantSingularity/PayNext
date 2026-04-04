# Security Module - Core security services for PayNext

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_kms_key" "paynext_key" {
  description             = "PayNext encryption key for ${var.environment}"
  deletion_window_in_days = var.kms_key_deletion_window
  enable_key_rotation     = true
  multi_region            = true

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow CloudTrail to encrypt logs"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action = [
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        Resource = "*"
      },
      {
        Sid    = "Allow CloudWatch Logs"
        Effect = "Allow"
        Principal = {
          Service = "logs.${data.aws_region.current.name}.amazonaws.com"
        }
        Action = [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        Resource = "*"
      },
      {
        Sid    = "Allow S3 Service"
        Effect = "Allow"
        Principal = {
          Service = "s3.amazonaws.com"
        }
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = "*"
      },
      {
        Sid    = "Allow RDS Service"
        Effect = "Allow"
        Principal = {
          Service = "rds.amazonaws.com"
        }
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = "*"
      },
      {
        Sid    = "Allow EKS Service"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = "*"
      }
    ]
  })

  tags = merge(var.tags, {
    Name       = "PayNext-KMS-Key-${var.environment}"
    Purpose    = "Encryption"
    Compliance = "PCI-DSS,GDPR,SOX"
  })
}

resource "aws_kms_alias" "paynext_key_alias" {
  name          = "alias/paynext-${var.environment}"
  target_key_id = aws_kms_key.paynext_key.key_id
}

resource "aws_secretsmanager_secret" "paynext_secrets" {
  count = var.enable_secrets_manager ? 1 : 0

  name                    = "paynext/${var.environment}/application-secrets"
  description             = "PayNext application secrets for ${var.environment}"
  kms_key_id              = aws_kms_key.paynext_key.arn
  recovery_window_in_days = 30

  replica {
    region     = var.dr_region
    kms_key_id = aws_kms_key.paynext_key.arn
  }

  tags = merge(var.tags, {
    Name       = "PayNext-Secrets-${var.environment}"
    Purpose    = "SecretsManagement"
    Compliance = "PCI-DSS,GDPR,SOX"
  })
}

resource "aws_secretsmanager_secret_version" "paynext_secrets_version" {
  count = var.enable_secrets_manager ? 1 : 0

  secret_id = aws_secretsmanager_secret.paynext_secrets[0].id
  secret_string = jsonencode({
    database_password    = "CHANGE_ME_IN_PRODUCTION"
    jwt_secret           = "CHANGE_ME_IN_PRODUCTION"
    api_key              = "CHANGE_ME_IN_PRODUCTION"
    encryption_key       = "CHANGE_ME_IN_PRODUCTION"
    payment_gateway_key  = "CHANGE_ME_IN_PRODUCTION"
    notification_api_key = "CHANGE_ME_IN_PRODUCTION"
  })

  lifecycle {
    ignore_changes = [secret_string]
  }
}

resource "aws_wafv2_web_acl" "paynext_waf" {
  count = var.enable_waf ? 1 : 0

  name  = "paynext-waf-${var.environment}"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "KnownBadInputsRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesSQLiRuleSet"
    priority = 3

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "SQLiRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "RateLimitRule"
    priority = 4

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = var.waf_rate_limit
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitRule"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "GeoBlockRule"
    priority = 5

    action {
      block {}
    }

    statement {
      geo_match_statement {
        country_codes = var.blocked_countries
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "GeoBlockRule"
      sampled_requests_enabled   = true
    }
  }

  tags = merge(var.tags, {
    Name       = "PayNext-WAF-${var.environment}"
    Purpose    = "WebApplicationFirewall"
    Compliance = "PCI-DSS,OWASP"
  })

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "PayNextWAF"
    sampled_requests_enabled   = true
  }
}

resource "aws_cloudwatch_log_group" "waf_log_group" {
  count = var.enable_waf ? 1 : 0

  name              = "/aws/wafv2/paynext-${var.environment}"
  retention_in_days = 365
  kms_key_id        = aws_kms_key.paynext_key.arn

  tags = merge(var.tags, {
    Name    = "PayNext-WAF-Logs-${var.environment}"
    Purpose = "WAFLogging"
  })
}

resource "aws_wafv2_web_acl_logging_configuration" "paynext_waf_logging" {
  count = var.enable_waf ? 1 : 0

  resource_arn            = aws_wafv2_web_acl.paynext_waf[0].arn
  log_destination_configs = [aws_cloudwatch_log_group.waf_log_group[0].arn]

  redacted_fields {
    single_header {
      name = "authorization"
    }
  }

  redacted_fields {
    single_header {
      name = "cookie"
    }
  }
}

resource "aws_iam_role" "waf_logging_role" {
  count = var.enable_waf ? 1 : 0

  name = "paynext-waf-logging-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "wafv2.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy" "waf_logging_policy" {
  count = var.enable_waf ? 1 : 0

  name = "paynext-waf-logging-policy-${var.environment}"
  role = aws_iam_role.waf_logging_role[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.waf_log_group[0].arn}:*"
      }
    ]
  })
}

resource "aws_securityhub_account" "paynext_security_hub" {
  count                    = var.enable_security_hub ? 1 : 0
  enable_default_standards = true
}

# Random string for unique bucket naming
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# S3 bucket for AWS Config - must be created before delivery channel
resource "aws_s3_bucket" "config_bucket" {
  count = var.enable_config ? 1 : 0

  bucket        = "paynext-config-${var.environment}-${random_string.bucket_suffix.result}"
  force_destroy = true

  tags = merge(var.tags, {
    Name    = "PayNext-Config-Bucket-${var.environment}"
    Purpose = "ConfigDelivery"
  })
}

resource "aws_s3_bucket_server_side_encryption_configuration" "config_bucket_encryption" {
  count = var.enable_config ? 1 : 0

  bucket = aws_s3_bucket.config_bucket[0].id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.paynext_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "config_bucket_pab" {
  count = var.enable_config ? 1 : 0

  bucket = aws_s3_bucket.config_bucket[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "config_bucket_versioning" {
  count = var.enable_config ? 1 : 0

  bucket = aws_s3_bucket.config_bucket[0].id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "config_bucket_policy" {
  count = var.enable_config ? 1 : 0

  bucket = aws_s3_bucket.config_bucket[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AWSConfigBucketPermissionsCheck"
        Effect = "Allow"
        Principal = {
          Service = "config.amazonaws.com"
        }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.config_bucket[0].arn
      },
      {
        Sid    = "AWSConfigBucketDelivery"
        Effect = "Allow"
        Principal = {
          Service = "config.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.config_bucket[0].arn}/AWSLogs/${data.aws_caller_identity.current.account_id}/Config/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.config_bucket_pab]
}

resource "aws_iam_role" "config_role" {
  count = var.enable_config ? 1 : 0

  name = "paynext-config-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "config.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "config_role_policy" {
  count = var.enable_config ? 1 : 0

  role       = aws_iam_role.config_role[0].name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWS_ConfigRole"
}

resource "aws_iam_role_policy" "config_s3_policy" {
  count = var.enable_config ? 1 : 0

  name = "paynext-config-s3-policy-${var.environment}"
  role = aws_iam_role.config_role[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetBucketAcl",
          "s3:GetBucketLocation",
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.config_bucket[0].arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = "${aws_s3_bucket.config_bucket[0].arn}/*"
      }
    ]
  })
}

# Delivery channel must be created before the recorder starts
resource "aws_config_delivery_channel" "paynext_config_delivery_channel" {
  count = var.enable_config ? 1 : 0

  name           = "paynext-config-delivery-channel-${var.environment}"
  s3_bucket_name = aws_s3_bucket.config_bucket[0].bucket

  snapshot_delivery_properties {
    delivery_frequency = var.config_delivery_frequency
  }

  depends_on = [
    aws_s3_bucket_policy.config_bucket_policy,
    aws_config_configuration_recorder.paynext_config_recorder
  ]
}

resource "aws_config_configuration_recorder" "paynext_config_recorder" {
  count = var.enable_config ? 1 : 0

  name     = "paynext-config-recorder-${var.environment}"
  role_arn = aws_iam_role.config_role[0].arn

  recording_group {
    all_supported                 = true
    include_global_resource_types = true
  }
}

resource "aws_config_configuration_recorder_status" "paynext_config_recorder_status" {
  count = var.enable_config ? 1 : 0

  name       = aws_config_configuration_recorder.paynext_config_recorder[0].name
  is_enabled = true

  depends_on = [aws_config_delivery_channel.paynext_config_delivery_channel]
}
