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
	await database.query({
		text: "UPDATE users SET youtube_profile_id = $2, youtube_access_token = $3, youtube_refresh_token = $4 WHERE id = $1",
		values: [req.session.userId, req.user.id, req.user.accessToken, req.user.refreshToken]
	})

	res.redirect("/profile")
})

router.delete("/", async (req, res) => {
	if (req.session.userId === undefined) {
		res.redirect("/login")
		return
	}

	await database.query({
		text: "UPDATE users SET youtube_profile_id = NULL, youtube_access_token = NULL, youtube_refresh_token = NULL WHERE id = $1",
		values: [req.session.userId]
	})

	res.send()
})

export default router
