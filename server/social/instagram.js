import express from "express"
import passport from "passport"
import InstagramPassport from "passport-instagram"
import axios from "axios"

import database from "../database.js"
import config from "../../config.js"

const router = express.Router()

passport.use(new InstagramPassport.Strategy({
	clientID: config.instagramClientID,
	clientSecret: config.instagramClientSecret,
	callbackURL: "https://au2001.com/redirect_localhost_instagram",
	scope: "user_profile,user_media"
}, async (accessToken, refreshToken, profile, done) => {
	if (refreshToken === undefined) {
		const { data } = await axios.get("https://graph.instagram.com/access_token", {
			params: {
				grant_type: "ig_exchange_token",
				client_secret: config.instagramClientSecret,
				access_token: accessToken
			}
		})
		refreshToken = data.access_token
	}

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
}, passport.authenticate("instagram", { failureRedirect: "/profile" }), async (req, res) => {
	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'instagram' AND profile_id = $2 LIMIT 1",
		values: [req.session.userId, req.user.id]
	})

	if (query.rows.length !== 0) {
		await database.query({
			text: "UPDATE accounts SET access_token = $2, refresh_token = $3 WHERE id = $1",
			values: [query.rows[0].id, req.user.accessToken, req.user.refreshToken]
		})
	} else {
		await database.query({
			text: "INSERT INTO accounts (user_id, type, profile_id, access_token, refresh_token) VALUES ($1, 'instagram', $2, $3, $4)",
			values: [req.session.userId, req.user.id, req.user.accessToken, req.user.refreshToken]
		})
	}

	res.redirect("/profile")
})

export default router
