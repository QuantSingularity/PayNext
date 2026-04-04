resource "kubernetes_deployment" "eureka_server" {
  metadata {
    name      = "eureka-server"
    namespace = var.namespace
    labels = {
      app         = "eureka-server"
      environment = var.environment
    }
  }

  spec {
    replicas = var.replica_count

    selector {
      match_labels = {
        app = "eureka-server"
      }
    }

    template {
      metadata {
        labels = {
          app         = "eureka-server"
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
          name  = "eureka-server"
          image = "quantsingularity/backend-eureka-server:latest"

          ports {
            container_port = 8001
          }

          env {
            name  = "EUREKA_SERVER_PORT"
            value = "8001"
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
              port = 8001
            }
            initial_delay_seconds = 60
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 5
          }

          readiness_probe {
            http_get {
              path = "/actuator/health/readiness"
              port = 8001
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

resource "kubernetes_service" "eureka_server" {
  metadata {
    name      = "eureka-server"
    namespace = var.namespace
    labels = {
      app = "eureka-server"
    }
  }

  spec {
    selector = {
      app = "eureka-server"
    }

    port {
      name        = "http"
      port        = 8001
      target_port = 8001
    }

    type = "ClusterIP"
  }
}
