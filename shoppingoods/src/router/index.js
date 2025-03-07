import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { useIsAuthenticated } from "../utils/auth";
import { AuthProvider } from "../compoutents/AuthContext";
import PrivateRoute from "../compoutents/PrivateRoute";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Layout = lazy(() => import("../pages/Layout"));

const routers = [
  {
    path: "/",
    element: <Layout />,
    children: [
		{
			path: "/",
			exact: true,
			label: "控制台",
			element: <div>控制台内容</div>,
      children: [
        {
          path: "/home1",
          label: "Home1",
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/home1/home11",
              label: "Home11",
              element: (
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              ),
            },
            {
              path: "/home1/about11",
              label: "about11",
              element: (
                <PrivateRoute>
                 <About />
                </PrivateRoute>
              )
            }
          ]
        },
        {
          path: "/about1",
          label: "about1",
          element: (
            <PrivateRoute>
              <About />
            </PrivateRoute>
          ),
        }
      ]
		  },
      {
        path: "/home",
        label: "Home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        label: "about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <div>login</div>,
  }
];

const route = createBrowserRouter(routers);
export default route;
