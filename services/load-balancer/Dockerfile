FROM nginx:1.11

MAINTAINER Mahan Hazrati<mahan@eloyt.com>

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/dev /etc/nginx/conf.d/dev/

COPY ./ssl-cert /etc/letsencrypt/live/

EXPOSE 80 443