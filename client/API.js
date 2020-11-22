API = window.API || {}

API.SOCIAL_TYPES = ["youtube", "twitter", "instagram", "reddit"]

API.getUser = async () => {
	try {
		const res = await axios.get('/auth/me')
		return res.data
	} catch (e) {
		return null
	}
}

API.login = async (email, password) => {
	await axios.post('/auth/login', { email, password })

	return await API.getUser()
}

API.register = async (email, password) => {
	await axios.post('/auth/register', { email, password })

	return await API.login(email, password)
}

API.logout = async () => {
	await axios.post('/auth/logout')
}

API.linkSocial = (type) => {
	if (!API.SOCIAL_TYPES.includes(type))
		throw new Error(`Invalid social type "${type}"`)

	window.location = `/auth/social/${type}`
}

API.listAccounts = async (type) => {
	if (type === undefined) {
		try {
			const res = await axios.get(`/api/accounts`)
			return res.data
		} catch (e) {
			return []
		}
	}

	if (!API.SOCIAL_TYPES.includes(type))
		throw new Error(`Invalid social type "${type}"`)

	try {
		const res = await axios.get(`/api/accounts/${type}`)
		return res.data
	} catch (e) {
		return []
	}
}

API.getAccount = async (id) => {
	try {
		const res = await axios.get(`/api/accounts/${id}`)
		return res.data
	} catch (e) {
		return null
	}
}

API.deleteAccount = async (id) => {
	try {
		const res = await axios.delete(`/api/accounts/${id}`)
		return res.data
	} catch (e) {
		return null
	}
}
