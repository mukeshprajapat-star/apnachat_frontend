import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin=lazy(()=> import("./pages/admin/AdminLogin"))
const SingleProfile=lazy(()=> import("./components/specific/SingleProfile"))


const UserManagement=lazy(()=> import("./pages/admin/UserManagement"))
const ChatManagement=lazy(()=> import("./pages/admin/ChatManagement"))

const MessageManagement=lazy(()=> import("./pages/admin/MessageManagement"))


import ProtectedRoute from "./components/auth/ProtectedRoute";
import {Loaders} from "./components/layout/Loaders";
import Dashboard from "./pages/admin/Dashboard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";
import "./pages/chat.css"

const App = () => {
  const {user,loader} =useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  useEffect(() => {
    axios.get(`/api/v1/user/me`,{withCredentials:true})
    .then(({data})=>dispatch(userExists(data.user)))
    .catch((err)=>dispatch(userNotExists()))
  }, [dispatch])
  
  return loader ? ( <Loaders/> ) :(
    <Router>
     <Suspense fallback={<div><Loaders/></div>}>
     <Routes>
        <Route element={
        <SocketProvider>
          <ProtectedRoute user={user} />
        </SocketProvider>}>
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<SingleProfile/>} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin/>} /> 
        <Route path="/admin/dashboard" element={<Dashboard/>} /> 
        <Route path="/admin/users" element={<UserManagement/>} /> 
        <Route path="/admin/chats" element={<ChatManagement/>} /> 

        <Route path="/admin/messages" element={<MessageManagement/>} /> 


        <Route path= "*" element={<NotFound/>} />
      </Routes>
     </Suspense>
     <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
