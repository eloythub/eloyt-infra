FROM postgres:9.6.1

MAINTAINER Mahan Hazrati<mahan@eloyt.com>

RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

RUN apt-get update -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
                                    build-essential \
                                    git \
                                    curl

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
                                    postgresql-9.6-postgis-2.3 \
                                    postgresql-contrib-9.6 \
                                    postgis-2.3

RUN rm -rf /var/lib/apt/lists/*
