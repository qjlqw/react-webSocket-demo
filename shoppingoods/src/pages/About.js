import { useSearchParams, useNavigate } from 'react-router-dom'
import react, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import './Layout/index.css'
import { ws, open, send, onmessage, receiver } from '../utils/WebSocket'
export default function About() {
	const [params] = useSearchParams()
	const navigate = useNavigate()
	for (const [key, value] of params.entries()) {
		console.log(key, value)
	}
	const [message, setMessage] = useState('')
	useEffect(() => {
		onmessage()
		window.addEventListener('textUpdated', (e) => {
			console.log(e.detail)
			setMessage(e.detail)
		})
	}, [])

	const onFinish = (values) => {
		console.log('Success:', values)
		send(values.username)
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	function luyin() {}
	function lushipin() {}
	return (
		<div className='About'>
			<Input placeholder='Basic usage' value={message} />
			<Form
				name='basic'
				labelCol={{
					span: 8
				}}
				wrapperCol={{
					span: 16
				}}
				initialValues={{
					remember: true
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item label='内容' name='username'>
					<Input />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16
					}}
				>
					<Button type='primary' htmlType='submit'>
						发送
					</Button>
					<Button onClick={luyin}>录音</Button>
					<Button onClick={lushipin}>录视频</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
