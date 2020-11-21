<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<h1>Dashboard</h1>
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
}
</script>

<style scoped>
</style>
