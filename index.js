import express from 'express'
import session from 'express-session'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import config from './config.js'
import serverRouter from './server/index.js'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: config.secret, saveUninitialized: false, resave: false }))

app.use('/api', serverRouter)
app.use(express.static('./client'))

app.listen(config.port, () => {
	console.log(`Listening on http://localhost:${config.port}`)
})
