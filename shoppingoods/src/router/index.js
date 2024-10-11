import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { useIsAuthenticated } from '../utils/auth'
import { AuthProvider } from '../compoutents/AuthContext'
import PrivateRoute from '../compoutents/PrivateRoute'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Layout = lazy(() => import('../pages/Layout'))

const routers = [
	{ path: '/', exact: true, element: <Layout /> },
	{
		path: '/home',
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		)
	},
	{
		path: '/about',
		element: (
			<PrivateRoute>
				<About />
			</PrivateRoute>
		)
	}
]

const route = createBrowserRouter(routers)
export default route
