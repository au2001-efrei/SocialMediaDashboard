import pg from "pg"

import config from "../config.js"

const database = new pg.Client(config.database)
database.connect()

async function init(database) {
	if (config.drop) {
		await database.query("DROP TABLE IF EXISTS accounts")
		await database.query("DROP TABLE IF EXISTS users")
		await database.query("DROP TYPE IF EXISTS SOCIAL_TYPE")
	}

	await database.query("DO $$ BEGIN\
		CREATE TYPE SOCIAL_TYPE AS ENUM ('youtube', 'twitter', 'instagram', 'reddit');\
		EXCEPTION WHEN duplicate_object THEN null;\
		END $$;")
	await database.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR NOT NULL, password VARCHAR NOT NULL)")
	await database.query("CREATE TABLE IF NOT EXISTS accounts (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, type SOCIAL_TYPE NOT NULL, profile_id VARCHAR NOT NULL, access_token VARCHAR NOT NULL, refresh_token VARCHAR NOT NULL)")
}

init(database)

export default database
