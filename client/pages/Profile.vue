<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<h1>Profile</h1>

		<b v-text="user.email"></b>
		<button @click="logout">Logout</button>

		<div>
			<span>Youtube: </span>
			<b v-text="user.youtube ? 'yes' : 'no'"></b>
			<button @click="logoutGoogle" v-show="user.youtube">Disconnect</button>
			<button @click="loginGoogle" v-show="!user.youtube">Connect</button>
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

	mounted() {
		if (this.user === undefined || this.user === null)
			this.$router.push("/login")
	},

	methods: {
		async loginGoogle() {
			const user = { fake: true } // TODO
			this.$parent.$emit("login-google", user)
		},

		async logoutGoogle() {
			// TODO
			this.$parent.$emit("login-google", undefined)
		},

		async loginTwitter() {
			const user = { fake: true } // TODO
			this.$parent.$emit("login-twitter", user)
		},

		async logoutTwitter() {
			// TODO
			this.$parent.$emit("login-twitter", undefined)
		},

		async loginInstagram() {
			const user = { fake: true } // TODO
			this.$parent.$emit("login-instagram", user)
		},

		async logoutInstagram() {
			// TODO
			this.$parent.$emit("login-instagram", undefined)
		},

		async loginReddit() {
			const user = { fake: true } // TODO
			this.$parent.$emit("login-reddit", user)
		},

		async logoutReddit() {
			// TODO
			this.$parent.$emit("login-reddit", undefined)
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
