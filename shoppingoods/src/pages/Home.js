import { Link, useNavigate } from 'react-router-dom'
import { Button, Modal, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
export default function Home() {
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const onFinish = (values) => {
		console.log('Success:', values)
		navigate('/about')
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='Home'>
			<Button type='primary' onClick={showModal}>
				创建房间
			</Button>
			<Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
					<Form.Item
						label='房间名'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!'
							}
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='房间号'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!'
							}
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name='remember'
						valuePropName='checked'
						wrapperCol={{
							offset: 8,
							span: 16
						}}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16
						}}
					>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
