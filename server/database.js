import pg from "pg"

import config from "../config.js"

const database = new pg.Client(config.database)
database.connect()

database.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR NOT NULL, password VARCHAR NOT NULL)")

export default database
