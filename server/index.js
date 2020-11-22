import express from "express"
import axios from "axios"
import Twit from "twit"

import database from "./database.js"
import config from "../config.js"

const router = express.Router()

router.get("/accounts", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1",
		values: [req.session.userId]
	})

	res.json(query.rows.map(account => ({
		id: account.id,
		type: account.type,
		profile_id: account.profile_id
	})))
})

router.get("/accounts/youtube", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'youtube'",
		values: [req.session.userId]
	})

	res.json(query.rows.map(account => ({
		id: account.id,
		type: account.type,
		profile_id: account.profile_id
	})))
})

router.get("/accounts/twitter", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'twitter'",
		values: [req.session.userId]
	})

	res.json(query.rows.map(account => ({
		id: account.id,
		type: account.type,
		profile_id: account.profile_id
	})))
})

router.get("/accounts/instagram", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'instagram'",
		values: [req.session.userId]
	})

	res.json(query.rows.map(account => ({
		id: account.id,
		type: account.type,
		profile_id: account.profile_id
	})))
})

router.get("/accounts/reddit", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND type = 'reddit'",
		values: [req.session.userId]
	})

	res.json(query.rows.map(account => ({
		id: account.id,
		type: account.type,
		profile_id: account.profile_id
	})))
})

router.get("/accounts/:id", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	const id = parseInt(req.params.id, 10)

	if (!Number.isFinite(id)) {
		res.status(404).json({ message: "account not found" })
		return
	}

	const query = await database.query({
		text: "SELECT * FROM accounts WHERE user_id = $1 AND id = $2 LIMIT 1",
		values: [req.session.userId, id]
	})

	if (query.rows.length === 0) {
		res.status(404).json({ message: "account not found" })
		return
	}

	const account = query.rows[0]

	try {
		var info = {
			id: account.id,
			type: account.type,
			profile_id: account.profile_id
		}

		switch(account.type) {
		case "youtube":
			const { data: youtubeData } = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
				params: {
					access_token: account.access_token,
					part: "statistics",
					mine: true
				}
			})

			info = {
				...info,
				views: youtubeData.items[0].statistics.viewCount,
				subscribers: youtubeData.items[0].statistics.subscriberCount,
				videos: youtubeData.items[0].statistics.videoCount
			}
			break;

		case "twitter":
			const api = new Twit({
				consumer_key: config.twitterConsumerKey,
				consumer_secret: config.twitterConsumerSecret,
				access_token: account.access_token,
				access_token_secret: account.refresh_token
			})

			const { data: twitterData } = await api.get("users/show", { id: account.profile_id })

			info = {
				...info,
				followers: twitterData.followers_count,
				friends: twitterData.friends_count,
				liked: twitterData.favourites_count,
				posts: twitterData.statuses_count
			}
			break;

		case "instagram":
			const { data: instagramData } = await axios.get(`https://graph.instagram.com/${account.profile_id}`, {
				params: {
					access_token: account.access_token,
					fields: "media_count"
				}
			})

			info = {
				...info,
				posts: instagramData.media_count
			}
			break;

		case "reddit":
			const { data: redditData } = await axios.get("https://oauth.reddit.com/api/v1/me", {
				headers: {
					Authorization: `Bearer ${account.access_token}`
				}
			})

			info = {
				...info,
				coins: redditData.coins,
				karma: redditData.total_karma,
				awarder_karma: redditData.awarder_karma,
				awardee_karma: redditData.awardee_karma,
				link_karma: redditData.link_karma,
				comment_karma: redditData.comment_karma,
				gold_creddits: redditData.gold_creddits
			}
			break;
		}

		res.json(info)
	} catch (err) {
		await database.query({
			text: "DELETE FROM accounts WHERE user_id = $1 AND id = $2",
			values: [req.session.userId, account.id]
		})

		console.log(err)

		res.json({
			message: "expired account",
			error: err
		})
	}
})

router.delete("/accounts/:id", async (req, res) => {
	if (req.session.userId === undefined) {
		res.status(401).json({ message: "not logged in" })
		return
	}

	await database.query({
		text: "DELETE FROM accounts WHERE user_id = $1 AND id = $2",
		values: [req.session.userId, req.params.id]
	})

	res.send()
})

export default router
