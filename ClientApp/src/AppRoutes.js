import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Admin } from "./components/admin";
import { RegisterSeller } from "./components/business/RegisterSeller";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
    login: false,
    roles: ["client"]
  },
  {
    path: "/register",
    element: <Register />,
    login: false,
    roles: ["client"]
  },

  {
    path: "/login",
    element: <Login />,
    login: false,
    roles: ["client"]
  },

  {
    path: "/admin",
    element: <Admin />,
    login: true,
    roles: ["Admin"]
  },
  {
    path: '/registerResturent',
    element: <RegisterSeller />,
    login: true,
    roles: ["client"]
  }
];

export default AppRoutes;
