import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import CardProduct from "./page/cardproduct/CardProduct.jsx";
import { Login } from "./page/auth/Login.jsx";
import { Signup } from "./page/auth/Register.jsx";
import CardAccount from "./page/cardproduct/CardAccount.jsx";
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import ProfileCard from "./page/cardproduct/ProfileCard.jsx";
import BookmarkedBlog from "./page/cardproduct/BookmarkedBlog.jsx";
import CreateBlog from "./page/cardproduct/CreateBlog.jsx";
import SearchAndFilter from "./page/cardproduct/SearchAndFilter.jsx";






const route = createBrowserRouter([
  { path: "/",
    element: <RootLayout />,
    children:[
      {
        path: "/",
        element: <App />
      },
    ]
    },
    {
      path: "/blogs/:id",
      element: <CardProduct/>
    },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Signup/>
      },
      {
        path: "/cardaccount",
        element: <CardAccount/>
      },
      {
        path: "/profilecard",
        element: <ProfileCard/>
      },
      {
        path: "/bookmarkedblog",
        element: <BookmarkedBlog/>
      },
      {
        path: "/createblog",
        element: <CreateBlog/>
      },
      {
        path: "/searchandfilter",
        element: <SearchAndFilter/>
      }

  
      
   


  
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={route}/>
   <ToastContainer />
   </Provider>
  </StrictMode>
);
