TEST_DIR=$(pwd)/testData

curl http://www.gaia-gis.it/spatialite-2.3.1/exif-gps-samples.zip > $TEST_DIR/photos.zip
unzip $TEST_DIR/photos.zip -d $TEST_DIR
rm -f $TEST_DIR/photos.zip