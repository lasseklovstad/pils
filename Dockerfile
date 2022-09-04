FROM openjdk:17
EXPOSE 8080
COPY target/pils-0.0.2-SNAPSHOT.jar /usr/app/pils-0.0.2-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/usr/app/pils-0.0.2-SNAPSHOT.jar"]
