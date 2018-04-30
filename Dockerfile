FROM ubuntu:14.04
RUN mkdir /home/posm-paths
COPY ./ /home/posm-paths/


# --- get curl and deps for building node. --- #
RUN apt-get update \
    && apt-get install -yq curl \ 
                           build-essential \
                           sqlite3 \ 
                           libsqlite3-dev \
                           libspatialite-dev \

# -- specific node version -- #
RUN curl -sL https://deb.nodesource.com/setup_8.x \
    && apt-get install nodejs