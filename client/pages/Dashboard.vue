<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<h1>Dashboard</h1>

		<div v-for="account in accounts" v-if="account.id in stats">
			{{ JSON.stringify(stats[account.id]) }}
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
		"user",
		"accounts"
	],

	components: {
		NavBar,
		CustomFooter
	},

	data: () => ({
		stats: {}
	}),

	mounted() {
		if (this.user === null)
			return this.$router.push("/login")

		this.fetchStats()
	},

	watch: {
		user() {
			if (this.user === null)
				return this.$router.push("/login")
		},
		accounts() {
			this.fetchStats()
		}
	},

	methods: {
		fetchStats() {
			const stats = {}
			this.stats = stats
			this.accounts.forEach(account => {
				API.getAccount(account.id).then(stat => {
					this.$set(stats, account.id, stat)
				})
			})
		}
	}
}
</script>

<style scoped>
</style>
