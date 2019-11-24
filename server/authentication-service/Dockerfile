FROM openjdk:13-jdk-alpine as build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:13-jdk-alpine

ARG DEPENDENCY=/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.chess.authenticationservice.AuthenticationServiceApplication"]
EXPOSE 8083

#FROM openjdk:13-jdk-alpine
#VOLUME /tmp
#ADD target/*.jar app.jar
#ENTRYPOINT [ "sh", "-c", "java -jar /app.jar" ]
