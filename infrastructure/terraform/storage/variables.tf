variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "allowed_principal_arns" {
  description = "List of IAM principal ARNs allowed to access the bucket"
  type        = list(string)
  default     = []
}
