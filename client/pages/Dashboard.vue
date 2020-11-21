<template>
	<div>
		<nav-bar :user="user"></nav-bar>

		<h1>Dashboard</h1>
	</div>
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
	}
}
</script>

<style scoped>
</style>
