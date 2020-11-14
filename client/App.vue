<template>
	<hello-world />
</template>

<script>
const HelloWorld = window.httpVueLoader('./components/HelloWorld.vue')

module.exports = {
	components: {
		HelloWorld
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
