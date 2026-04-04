resource "aws_security_group" "eks_security_group" {
  vpc_id      = aws_vpc.paynext_vpc.id
  name        = "paynext-eks-sg-${var.environment}"
  description = "Security group for EKS cluster nodes"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "PayNext-EKS-SG-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_security_group" "alb_security_group" {
  vpc_id      = aws_vpc.paynext_vpc.id
  name        = "paynext-alb-sg-${var.environment}"
  description = "Security group for Application Load Balancer"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "PayNext-ALB-SG-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_security_group" "app_security_group" {
  vpc_id      = aws_vpc.paynext_vpc.id
  name        = "paynext-app-sg-${var.environment}"
  description = "Security group for application services"

  ingress {
    description     = "App ports from EKS"
    from_port       = 8000
    to_port         = 9000
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_security_group.id]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "PayNext-App-SG-${var.environment}"
    Environment = var.environment
  }
}
