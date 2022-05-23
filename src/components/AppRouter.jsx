import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import PostIdPage from "./PostIdPage";
import { privateRoutes, publicRoutes, routes } from "./router";
import MyLoader from "./UI/Loader/MyLoader";


const AppRouter = () => {

const {isAuth, isLoading} = useContext(AuthContext);

if(isLoading) {
    return <MyLoader />
}

  return (
      
   
    isAuth?
    <Routes>
    <Route path="/about" element={<About />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/posts/:id" element={<PostIdPage />} />
    <Route path="/error" element={<Error />} />
    <Route path="*" element={<Navigate replace to="/posts" />} /> 
    </Routes>
    :
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/error" element={<Error />} />
    <Route path="*" element={<Navigate replace to="/login" />} /> 
    </Routes>
      
//     <Route path="" element={<Main />}></Route> 
//   <Route path="*" element={<Navigate replace to="/posts" />} /> 
    
  );
};

export default AppRouter;
