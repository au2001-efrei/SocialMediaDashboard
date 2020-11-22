<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<div class="details">
			<h1>Your account details</h1>

			<div class="account">
				<p>You are signed in as <span>{{ user.email }}</span></p>
				<button @click="logout">Logout</button>
			</div>

			<div class="socials">
				<div class="social youtube" @click="link('youtube')">
					<img src="/assets/youtube-icon.png" />

					<span>Link Youtube account</span>
				</div>

				<div class="social twitter" @click="link('twitter')">
					<img src="/assets/twitter-icon.png" />

					<span>Link Twitter account</span>
				</div>

				<div class="social instagram" @click="link('instagram')">
					<img src="/assets/instagram-icon.png" />

					<span>Link Instagram account</span>
				</div>

				<div class="social reddit" @click="link('reddit')">
					<img src="/assets/reddit-icon.png" />

					<span>Link Reddit account</span>
				</div>
			</div>
		</div>

		<div class="warning">
			If you are not able to connect to one of the services, it is because they require a whitelist of user accounts in development mode. Please contact us with your username on that specific service so that we can grant you access. You can also replace all the app credentials in the <code>config.js</code> file.
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

	mounted() {
		if (this.user === null)
			return this.$router.push("/login")
	},

	updated() {
		if (this.user === null)
			this.$router.push("/login")
	},

	methods: {
		async link(type) {
			await API.linkSocial(type)
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
.details {
	width: 90%;
	max-width: 800px;
	box-sizing: border-box;
	margin: 50px auto 20px auto;

	padding: 50px;
	border-radius: 30px;

	color: white;
	background-color: #171717;
	box-shadow: 5px 5px 50px #00000030;
}

.details h1 {
	margin: 0 0 30px 0;
	text-align: center;
}

.account {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.account p {
	padding: 10px 20px;
	border-radius: 100px;

	color: #c33e3d;
	background-color: white;
}

.account button {
	padding: 10px 30px;
	border-radius: 100px;

	font-size: 18px;
	color: white;
	background-color: #c33e3d;

	border: none;

	cursor: pointer;
}

.socials {
	margin-top: 50px;

	display: grid;

	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;

	grid-row-gap: 20px;
	grid-column-gap: 30px;
}

.social {
	padding: 10px 20px;
	margin: 0;

	background-color: white;
	border-radius: 100px;

	cursor: pointer;
}

.social img, .social span {
	vertical-align: middle;
}

.social img {
	margin-right: 10px;

	height: 20px;
}

.youtube {
	color: red;
	box-shadow: 0 0 20px #ff0000a0;
}

.twitter {
	color: #1da1f2;
	box-shadow: 0 0 20px #1da1f2a0;
}

.instagram {
	color: #833ab4;
	box-shadow: 0 0 20px #833ab4a0;
}

.reddit {
	color: #ff4500;
	box-shadow: 0 0 20px #ff4500a0;
}

.warning {
	width: 90%;
	max-width: 800px;
	box-sizing: border-box;
	margin: 20px auto 100px auto;

	padding: 30px;
	border-radius: 30px;

	font-size: 18px;
	color: #c33e3d;
	box-shadow: 5px 5px 50px #00000030;
}
</style>
