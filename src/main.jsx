import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./Store/Store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp.jsx";
import Home from "./Components/Home.jsx";
import Rte from "./Components/Rte.jsx";
import PostForm from "./Components/Post-Form/PostForm.jsx";
import Allpost from "./Components/AllPost/Allpost.jsx";
import EditPost from "./Components/EditPost.jsx";
import Post from "./Components/Post.jsx";




const router = createBrowserRouter([
  {  
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-post", element:<Allpost/> },
     { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/rte", element: <Rte /> },
      { path: "/add-post", element: <PostForm /> },
      { path: "/edit-post/:id", element:<EditPost/> },
      { path:"/post/:id" , element: <Post/>   },
      
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    
  </Provider>
);
