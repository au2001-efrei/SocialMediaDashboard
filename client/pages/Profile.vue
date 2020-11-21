<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<h1>Profile</h1>

		<b v-text="user.email"></b>
		<button @click="logout">Logout</button>

		<div>
			<span>Youtube: </span>
			<b v-text="user.youtube ? 'yes' : 'no'"></b>
			<button @click="logoutYoutube" v-show="user.youtube">Disconnect</button>
			<button @click="loginYoutube" v-show="!user.youtube">Connect</button>
		</div>

		<div>
			<span>Twitter: </span>
			<b v-text="user.twitter ? 'yes' : 'no'"></b>
			<button @click="logoutTwitter" v-show="user.twitter">Disconnect</button>
			<button @click="loginTwitter" v-show="!user.twitter">Connect</button>
		</div>

		<div>
			<span>Instagram: </span>
			<b v-text="user.instagram ? 'yes' : 'no'"></b>
			<button @click="logoutInstagram" v-show="user.instagram">Disconnect</button>
			<button @click="loginInstagram" v-show="!user.instagram">Connect</button>
		</div>

		<div>
			<span>Reddit: </span>
			<b v-text="user.reddit ? 'yes' : 'no'"></b>
			<button @click="logoutReddit" v-show="user.reddit">Disconnect</button>
			<button @click="loginReddit" v-show="!user.reddit">Connect</button>
		</div>
	</div>
	<div v-else></div>
</template>

<script>
const NavBar = window.httpVueLoader("/components/NavBar.vue")

module.exports = {
	props: [
		"user"
	],

	components: {
		NavBar
	},

	updated() {
		if (this.user === null)
			this.$router.push("/login")
	},

	methods: {
		async loginYoutube() {
			await API.connectSocial("youtube")
		},

		async logoutYoutube() {
			await API.disconnectSocial("youtube")
			this.$parent.$emit("login-youtube", false)
		},

		async loginTwitter() {
			await API.connectSocial("twitter")
		},

		async logoutTwitter() {
			await API.disconnectSocial("twitter")
			this.$parent.$emit("login-twitter", false)
		},

		async loginInstagram() {
			await API.connectSocial("instagram")
		},

		async logoutInstagram() {
			await API.disconnectSocial("instagram")
			this.$parent.$emit("login-instagram", false)
		},

		async loginReddit() {
			await API.connectSocial("reddit")
		},

		async logoutReddit() {
			await API.disconnectSocial("reddit")
			this.$parent.$emit("login-reddit", false)
		},

		async logout() {
			await API.logout()
			this.$parent.$emit("login", null)
			this.$router.push("/login")
		}
	}
}
</script>

<style scoped>
</style>
