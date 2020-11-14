import express from 'express'
import bcrypt from 'bcrypt'
import pg from 'pg'

import config from '../config.js'

const router = express.Router()

const client = new pg.Client(config.database)
client.connect()

export default router
