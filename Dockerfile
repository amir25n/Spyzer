FROM nginx

ADD build/ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 5001
