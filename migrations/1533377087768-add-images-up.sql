CREATE TABLE Images(
    id UUID NOT NULL PRIMARY KEY,
    path TEXT NOT NULL,
    time TEXT NOT NULL,
    seqIdx NUMBER NOT NULL,
    seqId UUID NOT NULL,
    userId UUID NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(seqId) REFERENCES Sequences(id)
);

--- SpatialLite for image locations ---
SELECT AddGeometryColumn(
    'Images', 'loc', 4326, 'POINT', 'XY'
);
