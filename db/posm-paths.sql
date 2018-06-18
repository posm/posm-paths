-- bring in spatialite --
SELECT load_extension("mod_spatialite");
SELECT InitSpatialMetaData();

-- make the tables --
CREATE TABLE Users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Sequences(
    id UUID NOT NULL PRIMARY KEY,
    userId UUID NOT NULL,
    images JSON1 NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id)
);

CREATE TABLE Images(
    id UUID NOT NULL PRIMARY KEY,
    path TEXT NOT NULL,
    time TEXT NOT NULL,
    seqId UUID NOT NULL,
    userId UUID NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(seqId) REFERENCES Sequences(id)
);

--- SpatialLite for image locations ---
SELECT AddGeometryColumn(
    'Images', 'loc', 4326, 'POINT', 'XY'
);

--- get out of here!!! ---
.exit