// import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, Fragment } from 'react'
import { login } from '../../apis/Layout'
import './index.css'
import { useAuth } from '../../compoutents/AuthContext'
export default function Layout() {
	// const { isLoading } = useSelector((state) => {
	// 	console.log(state)
	// 	return state.baseReduce
	// })
	const JSstring = useRef(false)
	const navigate = useNavigate()
	const { login: loginValue } = useAuth()
	const [isMounted, setIsMounted] = useState('')
	const [iframeWindow, setIframeWindow] = useState(null)
	useEffect(() => {
		if (JSstring.current) return
		JSstring.current = true
		login().then((res) => {
			setIsMounted(res.data)
			loginValue()
		})
		// document.addEventListener('DOMContentLoaded', () => {
		// 	const iframe = document.getElementById('iframe')
		// 	console.log('dfdgdfgf')

		// 	// 监听 iframe 加载完成
		// 	iframe.onload = () => {
		// 		const iframeWindow = iframe.contentWindow
		// 		const iframeDocument = iframe.contentDocument
		// 		console.log('dfdgdfgf')

		// 		// 替换 iframe 内部的 XMLHttpRequest
		// 		new Proxy(iframeWindow, {
		// 			get(target, prop, receiver) {
		// 				console.log(prop)
		// 				if (prop === 'XMLHttpRequest') {
		// 					const originalXMLHttpRequest = target.XMLHttpRequest
		// 					target.XMLHttpRequest = class extends originalXMLHttpRequest {
		// 						open(method, url, ...args) {
		// 							console.log(`Opening request in iframe: ${method} ${url}`)
		// 							super.open(method, url, ...args)
		// 						}
		// 						send(...args) {
		// 							console.log(`Sending request in iframe`)
		// 							super.send(...args)
		// 						}
		// 					}
		// 				}
		// 				return Reflect.get(target, prop, receiver)
		// 			}
		// 		})
		// 	}
		// })
	}, [])

	useEffect(() => {
		const iframe = document.getElementById('myIframe')
		if (iframe && iframe.contentWindow) {
			setIframeWindow(iframe.contentWindow)
		}

		window.addEventListener('message', handleMessage)

		return () => {
			window.removeEventListener('message', handleMessage)
			// window.removeEventListener('popstate', () => {})
		}
	}, [isMounted])

	const handleMessage = (event) => {
		console.log('Received message:', event)

		// if (event.origin !== 'http://localhost:3000') {
		// 	return
		// }

		if (event.data === 'login') {
			console.log('Request:', event.data.request)
			navigate('/home')
		}
	}
	return (
		<div>
			<div className='index'>
				<iframe width={'99%'} title='iframe' height={'99%'} id='iframe' sandbox='allow-scripts allow-same-origin allow-forms allow-modals' srcDoc={isMounted}></iframe>
			</div>
			<Outlet />
		</div>
	)
}
