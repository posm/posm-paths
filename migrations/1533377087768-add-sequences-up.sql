CREATE TABLE Sequences(
    id UUID NOT NULL PRIMARY KEY,
    userId UUID NOT NULL,
    images JSON1 NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id)
);