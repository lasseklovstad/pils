FROM node:16 AS build-frontend
ENV HOME=/usr/src/app
WORKDIR $HOME
COPY ./pils-frontend/package*.json ./
RUN npm i
# Bundle app source
COPY ./pils-frontend .
RUN npm run build

FROM maven:3.6-openjdk-17 AS build-backend
ENV HOME=/usr/src/app
COPY src $HOME/src
COPY pom.xml $HOME

RUN --mount=type=cache,target=/root/.m2 mvn -f $HOME/pom.xml clean package -DskipTests

FROM openjdk:17-jdk-alpine as stage
ENV HOME=/usr/src/app
RUN mkdir -p application
WORKDIR application
COPY --from=build-backend $HOME/target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM openjdk:17-jdk-alpine
RUN addgroup -S pilsuser && adduser -S pilsuser -G pilsuser
USER pilsuser
WORKDIR application
COPY --from=stage application/dependencies/ ./
COPY --from=stage application/spring-boot-loader/ ./
COPY --from=stage application/snapshot-dependencies/ ./
COPY --from=stage application/application/ ./
COPY --from=build-frontend /usr/src/app/dist BOOT-INF/classes/public

EXPOSE 8080

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]


