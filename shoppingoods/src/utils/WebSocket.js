const ws = new WebSocket('ws://127.0.0.1:8888')
ws.binaryType = 'blob'
const open = () => {
	ws.onopen = (event) => {
		console.log('Webws connection opened:', event)
	}
}
const close = () => {
	ws.onclose = (event) => {
		console.log('Webws connection closed:', event)
	}
}
const error = () => {
	ws.onerror = (event) => {
		console.error('Webws error:', event)
	}
}

let receiver = ''

const onmessage = () => {
	ws.onmessage = async (event) => {
		if (event.data instanceof Blob) {
			const blob = event.data
			const arrayBuffer = new Uint8Array(await blob.arrayBuffer())
			// 转换为文本
			const decoder = new TextDecoder('utf-8')
			receiver = decoder.decode(arrayBuffer)
			window.dispatchEvent(new CustomEvent('textUpdated', { detail: receiver }))
			console.log('Received message:', receiver)
		}
	}
}

const send = (data) => {
	ws.send(data)
}

// 检查初始网络状态
function checkNetworkStatus() {
	if (navigator.onLine) {
		console.log('网络连接正常')
		open()
	} else {
		console.log('网络已断开')
	}
}

export { ws, open, close, error, onmessage, send, checkNetworkStatus, receiver }
