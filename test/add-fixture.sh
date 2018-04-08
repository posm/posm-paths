#!/bin/bash
set -e
# create test data folder structure
mkdir data/
mkdir data/canaan
# grab fixture data to db
wget -qO- -O data/canaan/canaan.zip \
    # s3 linky && \
    unzip data/canaan/canaan.zip &&
    rm data/canaan/canaan.zip
# put fixture data in the db.
node add-fixture.js
