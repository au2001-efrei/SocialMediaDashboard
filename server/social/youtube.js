import express from "express"
import passport from "passport"
import YoutubePassport from "passport-youtube-v3"

import database from "../database.js"
import config from "../../config.js"

const router = express.Router()

passport.use(new YoutubePassport.Strategy({
	clientID: config.youtubeClientID,
	clientSecret: config.youtubeClientSecret,
	callbackURL: "http://localhost:3000/auth/social/youtube",
	scope: ["https://www.googleapis.com/auth/youtube.readonly"]
}, (accessToken, refreshToken, profile, done) => {
	return done(null, {
		id: profile.id,
		accessToken,
		refreshToken
	})
}))

router.get("/", async (req, res, next) => {
	if (req.session.userId === undefined) {
		res.redirect("/login")
		return
	}

	next()
}, passport.authenticate("youtube", { failureRedirect: "/profile" }), async (req, res) => {
	if (req.user.id === null) {
		res.redirect("/profile")
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'youtube' AND profile_id = $2 LIMIT 1",
		values: [req.session.userId, req.user.id]
	})

	if (query.rows.length !== 0) {
		await database.query({
			text: "UPDATE accounts SET access_token = $2, refresh_token = $3 WHERE id = $1",
			values: [query.rows[0].id, req.user.accessToken, req.user.refreshToken]
		})
	} else {
		await database.query({
			text: "INSERT INTO accounts (user_id, type, profile_id, access_token, refresh_token) VALUES ($1, 'youtube', $2, $3, $4)",
			values: [req.session.userId, req.user.id, req.user.accessToken, req.user.refreshToken]
		})
	}

	res.redirect("/profile")
})

export default router
