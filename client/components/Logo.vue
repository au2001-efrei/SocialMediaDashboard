<template>
	<div :class="{ white, fullWhite }">
		<span>Social Media</span>
		<span>Dashboard</span>
	</div>
</template>

<script>
module.exports = {
	props: [
		"white",
		"full-white"
	]
}
</script>

<style scoped>
div {
	display: inline-block;
	border-left: 3px solid #c33e3d;
	padding-left: 10px;
	font-size: 24px;
	color: #707070;
	font-weight: 500;
}

span {
	display: block;
}

span:last-child {
	color: #c33e3d;
	text-align: right;
}

.white, .fullWhite {
	color: white;
}

.fullWhite {
	border-left-color: white;
}

.fullWhite span:last-child {
	color: white;
}
</style>
