FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /build
COPY target/payment-service-1.0.0.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
WORKDIR /app
COPY --from=builder /build/dependencies/ ./
COPY --from=builder /build/spring-boot-loader/ ./
COPY --from=builder /build/snapshot-dependencies/ ./
COPY --from=builder /build/application/ ./
EXPOSE 8004
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
