import axios from 'axios'

const baseURL = 'http://127.0.0.1:5174'

const serve = axios.create({
	baseURL
})
serve.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		...{
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: 'Bearer ' + sessionStorage.getItem('token') || ''
		}
	}
	config.method = config.method.toUpperCase()
	return config
})

serve.interceptors.response.use((data) => {
	if (data.status == 0) return Promise.reject(data.data)
	else if (data.status >= 400 && data.status < 500) return Promise.reject(data.data)
	return {
		data: data.data.data,
		code: data.status,
		message: data.data.message
	}
})

export default serve
