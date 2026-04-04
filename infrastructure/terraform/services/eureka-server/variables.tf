variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "namespace" {
  description = "Kubernetes namespace"
  type        = string
  default     = "paynext"
}

variable "replica_count" {
  description = "Number of replicas"
  type        = number
  default     = 2
}

variable "secrets_manager_arn" {
  description = "ARN of the Secrets Manager secret"
  type        = string
}

variable "eureka_server_url" {
  description = "Eureka server URL"
  type        = string
  default     = "http://eureka-server:8001/eureka"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
