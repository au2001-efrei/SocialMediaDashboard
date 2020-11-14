const App = window.httpVueLoader('./App.vue')

Vue.config.productionTip = false

new Vue({
	el: '#app',
	components: {
		app: App
	}
})
