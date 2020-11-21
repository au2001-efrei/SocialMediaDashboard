import pg from "pg"

import config from "../config.js"

const database = new pg.Client(config.database)
database.connect()

if (config.drop) database.query("DROP TABLE IF EXISTS users")

database.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR NOT NULL, password VARCHAR NOT NULL)")

export default database
