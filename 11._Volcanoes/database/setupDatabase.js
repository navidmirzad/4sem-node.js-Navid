import db from "./connection.js";


// DDL
db.exec(`CREATE TABLE IF NOT EXISTS volcanoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255) NOT NULL,
    isActive boolean,
    type TEXT CHECK ( type IN ('Caldera', 'Underwater', 'Underground', 'Super Volcanoe' ) )
)
`);

db.exec(`CREATE TABLE IF NOT EXISTS villages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
)`)

/* INSERT into volcanoes(name, isActive) 
    VALUES
        ('Mount Fuji', true, 'Japan'),
        ('Mount Vesuvius', true, ''),
        ('Nngorongoro Crater, false, '') */
