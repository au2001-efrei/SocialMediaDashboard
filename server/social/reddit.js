import express from "express"
import passport from "passport"
import RedditPassport from "passport-reddit"

import database from "../database.js"
import config from "../../config.js"

const router = express.Router()

passport.use(new RedditPassport.Strategy({
	clientID: config.redditConsumerKey,
	clientSecret: config.redditConsumerSecret,
	callbackURL: "http://localhost:3000/auth/social/reddit"
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
}, passport.authenticate("reddit", {
	state: "0",
	duration: "permanent",
	failureRedirect: "/profile" }), async (req, res) => {
	await database.query({
		text: "UPDATE users SET reddit_profile_id = $2, reddit_access_token = $3, reddit_refresh_token = $4 WHERE id = $1",
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
		text: "UPDATE users SET reddit_profile_id = NULL, reddit_access_token = NULL, reddit_refresh_token = NULL WHERE id = $1",
		values: [req.session.userId]
	})

	res.send()
})

export default router
