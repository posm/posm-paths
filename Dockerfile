FROM ubuntu:14.04
RUN mkdir /home/posm-paths
COPY ./ /home/posm-paths/

# --- get curl and deps for building node. --- #
RUN apt-get update \
    && apt-get install -yq curl build-essential

# --- deps for spatialite --- #
RUN apt-get update \
    && apt-get install -yq wget \
                           sqlite3 \ 
                           libsqlite3-dev \
                           libspatialite-dev \
                           python3-pip \
                           python-virtualenv

# --- init the database --- #
RUN cd /home/posm-paths/db \
    && sqlite3 posm-paths.sqlite3 < posm-paths.sql
