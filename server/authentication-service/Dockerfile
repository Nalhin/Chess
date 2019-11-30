FROM openjdk:13-jdk-alpine
VOLUME /tmp
ADD target/*.jar app.jar
ENTRYPOINT [ "sh", "-c", "java -jar /app.jar" ]
EXPOSE 8083