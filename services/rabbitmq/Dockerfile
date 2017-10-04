FROM rabbitmq

MAINTAINER Mahan Hazrati <mahan@eloyt.com>

RUN apt-get update && apt-get install curl -y

RUN rabbitmq-plugins enable --offline rabbitmq_management

EXPOSE 15671 15672