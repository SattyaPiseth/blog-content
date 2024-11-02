import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const route = createBrowserRouter([
  { path: "/",
    element: <RootLayout />,
    children:[
      {
        path: "/",
        element: <App />
      }
    ]
    }
  
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={route}/>
   </Provider>
  </StrictMode>
);
