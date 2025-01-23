FROM alpine/java:21-jre

ARG DB_URL
ARG DB_USERNAME
ARG DB_PASSWORD
ARG BACKEND_URL
ARG FRONTEND_URL
ARG PASSWORD

# Set environment variables from build arguments
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV BACKEND_URL=${BACKEND_URL}
ENV FRONTEND_URL=${FRONTEND_URL}
ENV PASSWORD=${PASSWORD}

## Ovdje je moguce instalirati alate potrebne za rad aplikacije. Vjerojatno vam nece trebati, no dobro je znati.
## Linux distro koji se koristi je Alpine, stoga se kao package manager koristi apk
# RUN apk install <nesto>

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY target/*.jar /app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app.jar"]
