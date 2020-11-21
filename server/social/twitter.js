import express from "express"
import passport from "passport"
import TwitterPassport from "passport-twitter"

import database from "../database.js"
import config from "../../config.js"

const router = express.Router()

passport.use(new TwitterPassport.Strategy({
	consumerKey: config.twitterConsumerKey,
	consumerSecret: config.twitterConsumerSecret,
	callbackURL: "http://localhost:3000/auth/social/twitter"
}, (token, tokenSecret, profile, done) => {
	return done(null, {
		id: profile.id,
		token,
		tokenSecret
	})
}))

router.get("/", async (req, res, next) => {
	if (req.session.userId === undefined) {
		res.redirect("/login")
		return
	}

	next()
}, passport.authenticate("twitter", { failureRedirect: "/profile" }), async (req, res) => {
	await database.query({
		text: "UPDATE users SET twitter_profile_id = $2, twitter_token = $3, twitter_token_secret = $4 WHERE id = $1",
		values: [req.session.userId, req.user.id, req.user.token, req.user.tokenSecret]
	})

	res.redirect("/profile")
})

router.delete("/", async (req, res) => {
	if (req.session.userId === undefined) {
		res.redirect("/login")
		return
	}

	await database.query({
		text: "UPDATE users SET twitter_profile_id = NULL, twitter_token = NULL, twitter_token_secret = NULL WHERE id = $1",
		values: [req.session.userId]
	})

	res.send()
})

export default router
