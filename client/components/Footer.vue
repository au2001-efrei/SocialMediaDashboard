<template>
	<footer>
		<div class="links">
			<!-- TODO -->
		</div>

		<p>
			Copyright &copy; Duc-Thomas Nguyen &amp; Aurélien Garnier &amp; Yoni Feldman &ndash; 2020.<br/><br/>
			Images freely provided by <a href="https://unsplash.coom">Unsplash</a>. The logos used are the property of their respective owners.
		</p>
	</footer>
</template>

<script>
module.exports = {}
</script>

<style scoped>
footer {
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	height: 300px;
	background-color: #171717;
}

.links {
	flex: 1;
}

p {
	margin: 30px;
	color: white;
	text-align: center;
}

a {
	color: inherit;
}
</style>
