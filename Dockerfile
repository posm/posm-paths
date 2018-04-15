FROM ubuntu:14.04
RUN mkdir /home/posm-paths
COPY ./ /home/posm-paths/

# --- get curl and deps for building node. --- #
RUN apt-get update \
    && apt-get install -yq curl build-essential

# --- go get node --- #
RUN cd ~ \
    && curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && sudo apt-get install -yq nodejs

    # --- deps for spatialite --- #
RUN apt-get update \
    && apt-get install -yq wget \
                           sqlite3 \ 
                           libsqlite3-dev \
                           libspatialite-dev

# --- init the database --- #
RUN cd /home/posm-paths/db \
    && sqlite3 posm-paths.sqlite3 < posm-paths.sql
