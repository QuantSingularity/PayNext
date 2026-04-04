output "cluster_name" {
  description = "Name of the EKS cluster"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint for the EKS Kubernetes API"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security Group ID associated with the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

output "eks_cluster_role_arn" {
  description = "IAM Role ARN for the EKS cluster"
  value       = module.eks.cluster_iam_role_arn
}

output "node_group_name" {
  description = "Managed node group name within the EKS cluster"
  value       = module.eks.eks_managed_node_groups["paynext_nodes"].node_group_id
}

output "cluster_certificate_authority_data" {
  description = "Base64 encoded certificate data required to communicate with the cluster"
  value       = module.eks.cluster_certificate_authority_data
}

output "nginx_ingress_release_name" {
  description = "Helm release name for NGINX Ingress Controller"
  value       = helm_release.nginx_ingress.name
}

output "prometheus_release_name" {
  description = "Helm release name for kube-prometheus-stack"
  value       = helm_release.prometheus.name
}
