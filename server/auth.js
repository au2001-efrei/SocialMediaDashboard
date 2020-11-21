import express from "express"
import bcrypt from "bcrypt"

import database from "./database.js"
import config from "../config.js"

import socialRouter from "./social/index.js"

const router = express.Router()

router.use("/social", socialRouter)

router.post("/register", async (req, res) => {
	const email = req.body.email
	const password = req.body.password

	if (typeof email !== "string" || email === "" ||
			typeof password !== "string" || password === "") {
		res.status(400).json({ message: "missing email or password" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM users WHERE email = $1 LIMIT 1",
		values: [email]
	})

	if (query.rows.length !== 0) {
		res.status(400).json({ message: "email taken" })
		return
	}

	const hash = await bcrypt.hash(password, 10)

	await database.query({
		text: "INSERT INTO users (email, password) VALUES ($1, $2)",
		values: [email, hash]
	})

	res.send()
})

router.post("/login", async (req, res) => {
	if (req.session.userId !== undefined) {
		res.status(401).json({ message: "already logged in" })
		return
	}

	const email = req.body.email
	const password = req.body.password

	if (typeof email !== "string" || email === "" ||
			typeof password !== "string" || password === "") {
		res.status(400).json({ message: "missing email or password" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM users WHERE email = $1 LIMIT 1",
		values: [email]
	})

	if (query.rows.length === 0) {
		res.status(400).json({ message: "incorrect credentials" })
		return
	}

	const user = query.rows[0]
	const valid = await bcrypt.compare(password, user.password)

	if (!valid) {
		res.status(400).json({ message: "incorrect credentials" })
		return
	}

	req.session.userId = user.id

	res.send()
})

router.post("/logout", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	delete req.session.userId

	res.send()
})

router.get("/me", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM users WHERE id = $1 LIMIT 1",
		values: [req.session.userId]
	})

	if (query.rows.length === 0) {
		res.status(400).json({ message: "user no longer existent" })
		return
	}

	const user = query.rows[0]

	res.json({
		id: user.id,
		email: user.email,
		youtube: user.youtube_profile_id !== null,
		twitter: user.twitter_profile_id !== null,
		instagram: user.instagram_profile_id !== null,
		reddit: user.reddit_profile_id !== null
	})
})

export default router
