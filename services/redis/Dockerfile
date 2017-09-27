FROM redis:4

MAINTAINER Mahan Hazrati <mahan@eloyt.com>

COPY redis.conf /usr/local/etc/redis/redis.conf

#CMD [ "redis-server", "/usr/local/etc/redis/redis.conf", "--bind 0.0.0.0" ]

CMD redis-server --bind 0.0.0.0

EXPOSE 6379