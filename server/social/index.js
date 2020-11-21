import express from "express"
import passport from "passport"

import youtubeRouter from "./youtube.js"
import twitterRouter from "./twitter.js"
import instagramRouter from "./instagram.js"
import redditRouter from "./reddit.js"

const router = express.Router()

router.use(passport.initialize())

passport.serializeUser(function(user, done) {
	done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
	done(null, JSON.parse(user));
});

router.use("/youtube", youtubeRouter)
router.use("/twitter", twitterRouter)
router.use("/instagram", instagramRouter)
router.use("/reddit", redditRouter)

export default router
