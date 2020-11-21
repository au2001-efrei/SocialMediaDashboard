<template>
	<div>
		<nav-bar :user="user"></nav-bar>

		<h1>404</h1>
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
	}
}
</script>

<style scoped>
</style>
