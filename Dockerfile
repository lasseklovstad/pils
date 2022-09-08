FROM gcr.io/distroless/java17-debian11
COPY target/pils-0.0.1-SNAPSHOT.jar /usr/app/pils-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/pils-0.0.1-SNAPSHOT.jar"]
