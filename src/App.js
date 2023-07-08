import Home from "./screens/Home";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from "./components/contextReducer";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MyOrder from "./screens/MyOrders";


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/createuser", element: <SignUp /> },
    {path:"/myOrders", element:<MyOrder />}
  ])

  return (
    <CartProvider>
      <div>
        <RouterProvider router={router} />
      </div>
      </CartProvider>

  );
}

export default App;
