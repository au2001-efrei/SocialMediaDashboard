<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<h1>Dashboard</h1>

		<div v-if="user.youtube">
			<h2>Youtube</h2>
			<pre v-text="youtubeStats"></pre>
		</div>

		<div v-if="user.twitter">
			<h2>Twitter</h2>
			<pre v-text="twitterStats"></pre>
		</div>

		<div v-if="user.instagram">
			<h2>Instagram</h2>
			<pre v-text="instagramStats"></pre>
		</div>

		<div v-if="user.reddit">
			<h2>Reddit</h2>
			<pre v-text="redditStats"></pre>
		</div>

		<custom-footer></custom-footer>
	</div>
	<div v-else></div>
</template>

<script>
const NavBar = window.httpVueLoader("/components/NavBar.vue")
const CustomFooter = window.httpVueLoader("/components/Footer.vue")

module.exports = {
	props: [
		"user"
	],

	components: {
		NavBar,
		CustomFooter
	},

	data: () => ({
		youtubeStats: null,
		twitterStats: null,
		instagramStats: null,
		redditStats: null
	}),

	mounted() {
		if (this.user === null)
			return this.$router.push("/login")
	},

	updated() {
		if (this.user === null)
			return this.$router.push("/login")

		if (this.user.youtube) {
			API.getSocialStats("youtube").then(youtubeStats => {
				this.youtubeStats = JSON.stringify(youtubeStats)
				console.log(this.youtubeStats)
			})
		}

		if (this.user.twitter) {
			API.getSocialStats("twitter").then(twitterStats => {
				this.twitterStats = JSON.stringify(twitterStats)
				console.log(this.twitterStats)
			})
		}

		if (this.user.instagram) {
			API.getSocialStats("instagram").then(instagramStats => {
				this.instagramStats = JSON.stringify(instagramStats)
				console.log(this.instagramStats)
			})
		}

		if (this.user.reddit) {
			API.getSocialStats("reddit").then(redditStats => {
				this.redditStats = JSON.stringify(redditStats)
				console.log(this.redditStats)
			})
		}
	}
}
</script>

<style scoped>
</style>
