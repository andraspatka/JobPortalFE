FROM nginx:latest
# Default value, PORT env variable gets set in Heroku before container startup
ENV PORT=8080
COPY dist/jobportalFrontend /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
