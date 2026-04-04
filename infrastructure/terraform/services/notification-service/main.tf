data "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = var.secrets_manager_arn
}

locals {
  secrets = jsondecode(data.aws_secretsmanager_secret_version.app_secrets.secret_string)
}

resource "kubernetes_deployment" "notification_service" {
  metadata {
    name      = "notification-service"
    namespace = var.namespace
    labels = {
      app         = "notification-service"
      environment = var.environment
    }
  }

  spec {
    replicas = var.replica_count

    selector {
      match_labels = {
        app = "notification-service"
      }
    }

    template {
      metadata {
        labels = {
          app         = "notification-service"
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
          name  = "notification-service"
          image = "quantsingularity/backend-notification-service:latest"

          ports {
            container_port = 8004
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
            name  = "NOTIFICATION_API_KEY"
            value = local.secrets["notification_api_key"]
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
              port = 8004
            }
            initial_delay_seconds = 60
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 5
          }

          readiness_probe {
            http_get {
              path = "/actuator/health/readiness"
              port = 8004
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

resource "kubernetes_service" "notification_service" {
  metadata {
    name      = "notification-service"
    namespace = var.namespace
    labels = {
      app = "notification-service"
    }
  }

  spec {
    selector = {
      app = "notification-service"
    }

    port {
      name        = "http"
      port        = 8004
      target_port = 8004
    }

    type = "ClusterIP"
  }
}
