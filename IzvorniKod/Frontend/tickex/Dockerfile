FROM nginx:alpine

# Kopira dist folder sadržaj sa stroja u nginx folder u Docker containeru
COPY build /usr/share/nginx/html

# Izlozi port
EXPOSE 80

# Kopira konfiguraciju nginx-a
COPY nginx.conf /etc/nginx/conf.d/default.template

# postavlja entrypoint
ENTRYPOINT ["/bin/sh", "-c", "envsubst '${REACT_APP_BACKEND_URL}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
