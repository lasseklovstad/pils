FROM gcr.io/distroless/java17-debian11
EXPOSE 8080
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} /usr/app/app.jar
ENTRYPOINT ["java","-jar","/usr/app/app.jar"]
