import pg from "pg"

import config from "../config.js"

const database = new pg.Client(config.database)
database.connect()

if (config.drop) database.query("DROP TABLE IF EXISTS users")

database.query("CREATE TABLE IF NOT EXISTS users (\
	id SERIAL PRIMARY KEY, email VARCHAR NOT NULL, password VARCHAR NOT NULL,\
	youtube_profile_id VARCHAR, youtube_access_token VARCHAR, youtube_refresh_token VARCHAR,\
	twitter_profile_id VARCHAR, twitter_token VARCHAR, twitter_token_secret VARCHAR,\
	instagram_profile_id VARCHAR, instagram_access_token VARCHAR, instagram_refresh_token VARCHAR,\
	reddit_profile_id VARCHAR, reddit_access_token VARCHAR, reddit_refresh_token VARCHAR\
)")

export default database
