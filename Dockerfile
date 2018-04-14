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
    && apt-get install -yq wget libsqlite3-dev libproj-dev libgeos-dev build-essential zlib1g-dev pkg-config libxml2-dev libexpat1-dev

# --- spatialite! --- #
RUN wget http://www.gaia-gis.it/gaia-sins/libspatialite-sources/libspatialite-4.2.0.tar.gz \
    && tar -xvzf libspatialite-4.2.0.tar.gz \
    && cd libspatialite-4.2.0 \
    && ./configure \ 
        --with-geosconfig=/usr/bin/geos-config \
        --disable-freexl \
    && make -j8 \
    && make install-strip \
    && cd ~/

# --- spatialite-tools! --- #
RUN wget http://www.gaia-gis.it/gaia-sins/spatialite-tools-sources/spatialite-tools-4.2.0.tar.gz \
    && tar -xvzf spatialite-tools-4.2.0.tar.gz \
    && cd spatialite-tools-4.2.0 \
    && ./configure \
        --disable-readosm \
        --disable-freexl \
    && make -j8 \
    && make install-strip
    
# --- register the binaries! --- #
RUN echo "/usr/local/lib" >> /etc/ld.so.conf
RUN sudo ldconfig

# --- init the database --- #
RUN cd /home/posm-paths/db \
    && spatialite posm-paths.sqlite3 < posm-paths.sql
