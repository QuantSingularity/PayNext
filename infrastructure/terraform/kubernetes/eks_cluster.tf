module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.4"

  cluster_name    = var.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnet_ids
  cluster_endpoint_public_access = false

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  eks_managed_node_groups = {
    paynext_nodes = {
      desired_size = 2
      max_size     = 5
      min_size     = 1

      instance_types = [var.node_instance_type]
      capacity_type  = "ON_DEMAND"

      labels = {
        Environment = var.environment
        Project     = "PayNext"
      }

      tags = {
        Name        = "paynext-eks-node-${var.environment}"
        Environment = var.environment
        Project     = "PayNext"
      }
    }
  }

  enable_irsa = true

  tags = {
    Environment = var.environment
    Project     = "PayNext"
    ManagedBy   = "Terraform"
  }
}
