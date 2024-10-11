import React from 'react'
import ReactDOM from 'react-dom/client'
import route from './router/index'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import { Spin } from 'antd'
import { Provider } from 'react-redux'
import './index.css'
import { AuthProvider } from './compoutents/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthProvider>
			<React.Suspense fallback={<Spin size='large'>加载中</Spin>}>
				<Provider store={store}>
					<RouterProvider router={route} />
				</Provider>
			</React.Suspense>
		</AuthProvider>
	</React.StrictMode>
)
