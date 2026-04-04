data "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = var.secrets_manager_arn
}

locals {
  secrets = jsondecode(data.aws_secretsmanager_secret_version.app_secrets.secret_string)
}

resource "kubernetes_deployment" "api_gateway" {
  metadata {
    name      = "api-gateway"
    namespace = var.namespace
    labels = {
      app         = "api-gateway"
      environment = var.environment
    }
  }

  spec {
    replicas = var.replica_count

    selector {
      match_labels = {
        app = "api-gateway"
      }
    }

    template {
      metadata {
        labels = {
          app         = "api-gateway"
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
          name  = "api-gateway"
          image = "quantsingularity/backend-api-gateway:latest"

          ports {
            container_port = 8002
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
              port = 8002
            }
            initial_delay_seconds = 60
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 5
          }

          readiness_probe {
            http_get {
              path = "/actuator/health/readiness"
              port = 8002
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

resource "kubernetes_service" "api_gateway" {
  metadata {
    name      = "api-gateway"
    namespace = var.namespace
    labels = {
      app = "api-gateway"
    }
  }

  spec {
    selector = {
      app = "api-gateway"
    }

    port {
      name        = "http"
      port        = 8002
      target_port = 8002
    }

    type = "ClusterIP"
  }
}
