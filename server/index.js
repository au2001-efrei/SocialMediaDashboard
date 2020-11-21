import express from "express"
import axios from "axios"
import Twit from "twit"

import database from "./database.js"
import config from "../config.js"

const router = express.Router()

router.get("/youtube", async (req, res) => {
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

	if (user.facebook_profile_id === null) {
		res.status(400).json({ message: "social not connecte" })
		return
	}

	const { data: { items: [ { statistics } ] } } = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
		params: {
			access_token: user.youtube_access_token,
			part: "statistics",
			mine: true
		}
	})

	res.json({
		views: statistics.viewCount,
		subscribers: statistics.subscriberCount,
		videos: statistics.videoCount
	})
})

router.get("/twitter", async (req, res) => {
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

	if (user.twitter_profile_id === null) {
		res.status(400).json({ message: "social not connecte" })
		return
	}

	const api = new Twit({
		consumer_key: config.twitterConsumerKey,
		consumer_secret: config.twitterConsumerSecret,
		access_token: user.twitter_token,
		access_token_secret: user.twitter_token_secret
	})

	const { data } = await api.get("users/show", { id: user.twitter_profile_id })
	res.json({
		followers: data.followers_count,
		friends: data.friends_count,
		liked: data.favourites_count,
		posts: data.statuses_count
	})
})

router.get("/instagram", async (req, res) => {
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

	if (user.instagram_profile_id === null) {
		res.status(400).json({ message: "social not connecte" })
		return
	}

	const { data } = await axios.get(`https://graph.instagram.com/${user.instagram_profile_id}`, {
		params: {
			access_token: user.instagram_access_token,
			fields: "media_count"
		}
	})

	res.json({
		posts: data.media_count
	})
})

router.get("/reddit", async (req, res) => {
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

	if (user.reddit_profile_id === null) {
		res.status(400).json({ message: "social not connecte" })
		return
	}

	const { data } = await axios.get("https://oauth.reddit.com/api/v1/me", {
		headers: {
			Authorization: `Bearer ${user.reddit_access_token}`
		}
	})

	res.json({
		coins: data.coins,
		karma: data.total_karma,
		awarder_karma: data.awarder_karma,
		awardee_karma: data.awardee_karma,
		link_karma: data.link_karma,
		comment_karma: data.comment_karma,
		gold_creddits: data.gold_creddits
	})
})

export default router
