import Login from "../Components/Auth/login";
import Register from "../Components/Auth/register";
import Calender from "../Components/Calender";
import { RouteConfig } from "./Interface/interface";


export const PublicRoutes: RouteConfig[] = [
	{
		path: "/",
		component: <Login />,
	},
	{
		path: "/register",
		component: <Register/>,
	},
	{
		path:"/calender",
		component: <Calender />
	}
];

export const PrivateRoutes: RouteConfig[] = [];
