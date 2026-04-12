FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /build

COPY pom.xml ./pom.xml
COPY common-module/pom.xml ./common-module/pom.xml
COPY payment-service/pom.xml ./payment-service/pom.xml
COPY api-gateway/pom.xml ./api-gateway/pom.xml
COPY eureka-server/pom.xml ./eureka-server/pom.xml
COPY user-service/pom.xml ./user-service/pom.xml
COPY notification-service/pom.xml ./notification-service/pom.xml

RUN apk add --no-cache curl && \
    curl -fsSL https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz \
    | tar xz -C /opt && \
    ln -s /opt/apache-maven-3.9.6/bin/mvn /usr/local/bin/mvn
RUN mvn dependency:go-offline -B --no-transfer-progress || true

COPY common-module/src ./common-module/src
COPY payment-service/src ./payment-service/src

RUN mvn clean package -pl common-module,payment-service -am -DskipTests -B --no-transfer-progress

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
WORKDIR /app
COPY --from=builder /build/payment-service/target/payment-service-1.0.0.jar app.jar
EXPOSE 8004
ENTRYPOINT ["java", "-jar", "app.jar"]
