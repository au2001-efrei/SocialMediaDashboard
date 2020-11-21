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
	await database.query({
		text: "UPDATE users SET instagram_profile_id = $2, instagram_access_token = $3, instagram_refresh_token = $4 WHERE id = $1",
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
		text: "UPDATE users SET instagram_profile_id = NULL, instagram_access_token = NULL, instagram_refresh_token = NULL WHERE id = $1",
		values: [req.session.userId]
	})

	res.send()
})

export default router
