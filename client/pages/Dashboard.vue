<template>
	<div>
		<nav-bar></nav-bar>

		<h1>Dashboard</h1>
	</div>
</template>

<script>
const NavBar = window.httpVueLoader('/components/NavBar.vue')

module.exports = {
	components: {
		NavBar
	}
}
</script>

<style scoped>
</style>