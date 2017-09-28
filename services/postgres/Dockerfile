FROM postgres:9.6

MAINTAINER Mahan Hazrati<mahan@eloyt.com>

RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

RUN apt-get update -y \
    && DEBIAN_FRONTEND=noninteractive apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
                                    build-essential \
                                    git \
                                    curl \
                                    && rm -rf /var/lib/apt/lists/*
