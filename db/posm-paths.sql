-- bring in spatialite --
SELECT load_extension("libspatialite");
SELECT InitSpatialMetaData();

-- make the tables --
CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Sequences(
    id UUID NOT NULL PRIMARY KEY,
    userId INTEGER NOT NULL,
    images JSON1 NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id)
);

CREATE TABLE Images(
    id UUID NOT NULL PRIMARY KEY,
    path TEXT NOT NULL,
    time INTEGER NOT NULL,
    seqId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(seqId) REFERENCES Sequences(id)
);

--- SpatialLite for image locations ---
SELECT AddGeometryColumn(
    'Images', 'loc', 4326, 'POINT', 'XY'
);