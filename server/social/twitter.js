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
	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'twitter' AND profile_id = $2 LIMIT 1",
		values: [req.session.userId, req.user.id]
	})

	if (query.rows.length !== 0) {
		await database.query({
			text: "UPDATE accounts SET access_token = $2, refresh_token = $3 WHERE id = $1",
			values: [query.rows[0].id, req.user.accessToken, req.user.refreshToken]
		})
	} else {
		await database.query({
			text: "INSERT INTO accounts (user_id, type, profile_id, access_token, refresh_token) VALUES ($1, 'twitter', $2, $3, $4)",
			values: [req.session.userId, req.user.id, req.user.token, req.user.tokenSecret]
		})
	}

	res.redirect("/profile")
})

export default router
