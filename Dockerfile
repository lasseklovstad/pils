FROM node:16 AS build-frontend
WORKDIR /usr/src/app
COPY ./pils-frontend/package*.json ./
RUN npm i
# Bundle app source
COPY ./pils-frontend .
RUN npm run build

FROM maven:3.6-openjdk-17 AS build-backend
COPY src /usr/src/app/src
COPY --from=build-frontend /usr/src/app/dist /usr/src/app/src/main/resources/static
COPY pom.xml /usr/src/app

RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM gcr.io/distroless/java17-debian11
COPY --from=build-backend /usr/src/app/target/pils-0.0.1-SNAPSHOT.jar /usr/app/pils-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/pils-0.0.1-SNAPSHOT.jar"]
