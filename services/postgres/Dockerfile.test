FROM postgres:9.6

MAINTAINER Mahan Hazrati<mahan@eloyt.com>

RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

ENV POSTGIS_MAJOR 2.3
ENV POSTGIS_VERSION 2.3.2+dfsg-1~exp2.pgdg80+1

RUN apt-get update && apt-get install -y --no-install-recommends \
                                    build-essential \
                                    git \
                                    curl \
                                    postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
                                    postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts=$POSTGIS_VERSION \
                                    postgis=$POSTGIS_VERSION \
                                    && rm -rf /var/lib/apt/lists/*