API = window.API || {}

API.getUser = async () => {
	// TODO: axios
	return {
		email: "aurelien@picoti.com",
		youtube: false,
		twitter: false,
		instagram: false,
		reddit: false
	}
}

API.login = async (email, password) => {
	// TODO: axios
	return { email }
}

API.register = async (email, password) => {
	// TODO: axios
	return { email }
}

API.getGoogleUser = async () => {
	if (API.googleUser !== undefined)
		return API.googleUser.isSignedIn() ? API.googleUser : undefined

	const googleUser = await API.googleAuth.currentUser.get()
	if (googleUser !== undefined)
		API.googleUser = googleUser

	return API.googleUser.isSignedIn() ? API.googleUser : undefined
}

API.loginGoogle = async () => {
	const googleUser = await API.getGoogleUser()
	if (googleUser === undefined)
		API.googleUser = await API.googleAuth.signIn()

	const googleToken = API.googleUser.getAuthResponse().id_token
	console.log(googleToken) // TODO: axios
	// https://developers.google.com/identity/sign-in/web/backend-auth
	// https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps

	return API.googleUser
}

API.logoutGoogle = async () => {
	const googleUser = await API.getGoogleUser()
	if (googleUser === undefined) return

	// TODO: axios
	await googleUser.disconnect()
	delete API.googleUser
}

initGoogle = async () => {
	gapi.load("auth2", async () => {
		API.googleAuth = await gapi.auth2.init({
			client_id: "137670576518-b2lnmmfd86v57meudgjo93t2r1255g6j.apps.googleusercontent.com"
		})
	})
}
