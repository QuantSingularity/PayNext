data "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = var.secrets_manager_arn
}

locals {
  secrets = jsondecode(data.aws_secretsmanager_secret_version.app_secrets.secret_string)
}

resource "kubernetes_deployment" "payment_service" {
  metadata {
    name      = "payment-service"
    namespace = var.namespace
    labels = {
      app         = "payment-service"
      environment = var.environment
    }
  }

  spec {
    replicas = var.replica_count

    selector {
      match_labels = {
        app = "payment-service"
      }
    }

    template {
      metadata {
        labels = {
          app         = "payment-service"
          environment = var.environment
        }
      }

      spec {
        security_context {
          run_as_non_root = true
          run_as_user     = 10001
          fs_group        = 10001
        }

        container {
          name  = "payment-service"
          image = "quantsingularity/backend-payment-service:latest"

          ports {
            container_port = 8003
          }

          env {
            name  = "EUREKA_SERVER_URL"
            value = var.eureka_server_url
          }
          env {
            name  = "JWT_SECRET"
            value = local.secrets["jwt_secret"]
          }
          env {
            name  = "PAYMENT_GATEWAY_KEY"
            value = local.secrets["payment_gateway_key"]
          }
          env {
            name  = "SPRING_PROFILES_ACTIVE"
            value = var.environment
          }

          resources {
            requests = {
              memory = "256Mi"
              cpu    = "250m"
            }
            limits = {
              memory = "512Mi"
              cpu    = "500m"
            }
          }

          liveness_probe {
            http_get {
              path = "/actuator/health/liveness"
              port = 8003
            }
            initial_delay_seconds = 60
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 5
          }

          readiness_probe {
            http_get {
              path = "/actuator/health/readiness"
              port = 8003
            }
            initial_delay_seconds = 30
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 3
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "payment_service" {
  metadata {
    name      = "payment-service"
    namespace = var.namespace
    labels = {
      app = "payment-service"
    }
  }

  spec {
    selector = {
      app = "payment-service"
    }

    port {
      name        = "http"
      port        = 8003
      target_port = 8003
    }

    type = "ClusterIP"
  }
}
