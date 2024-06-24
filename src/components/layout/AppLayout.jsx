import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../specific/ChatList'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc'
import { useError, useSocketEvent } from '../../hooks/hooks'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../constants/events'
import { incrementNotification, setNewMessageAlert } from '../../redux/reducers/chat'
import { getOrSaveFromStorage } from '../../lib/features'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'

const  AppLayout= ()=>(WrappedComponent) => {

  return (props)=>{
    const params=useParams();
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [onlineUsers,setOnlineUsers]=useState([])


    const chatId=params.chatId;
    const deleteMenuAnchor=useRef(null)


    const socket=getSocket();
    const {isMobile}=useSelector((state)=>state.misc)
    const {user}=useSelector((state)=>state.auth)
    const {newMessagesAlert}=useSelector((state)=>state.chat)

    const {isLoading,data,isError,error,refetch} =useMyChatsQuery("");
    useError([{isError,error}])
    useEffect(() => {
      getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})

    }, [newMessagesAlert])
    

  
    const handleDeleteChat=(e,chatId,groupChat)=>{
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({chatId,groupChat}))
      deleteMenuAnchor.current=e.currentTarget
  
    }
    const handleMobileClose=()=>dispatch(setIsMobile(false))

    const newMesageAlertListener=useCallback((data)=>{
      if(data.chatId === chatId) return
      dispatch(setNewMessageAlert(data))

    },[chatId])

    const newRequestListener =useCallback(()=>{
      dispatch(incrementNotification())
    },[dispatch])

    const refetchListener =useCallback(()=>{
      refetch();
      navigate("/")
    },[refetch,navigate])

    const onlineUsersListener =useCallback((data)=>{
      setOnlineUsers(data)
    },[])

    const eventHandler={
      [NEW_MESSAGE_ALERT]:newMesageAlertListener,
      [NEW_REQUEST]:newRequestListener,
      [REFETCH_CHATS]:refetchListener,
      [ONLINE_USERS]:onlineUsersListener


    };

    useSocketEvent(socket,eventHandler);
  return (
   <>
   <Title/>
        <Header/>
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
        {isLoading ? <Skeleton/> :(
          <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList w= "70vw"  onlineUsers={onlineUsers} chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} />
          </Drawer>
        )}
      
      <Grid container height={"calc(100vh-4rem)"} >

        <Grid sm={4} md={3} sx={{display:{xs:"none",sm:"block"}}} item xs={4} height={"100%"}>
        {isLoading ? (
          <Skeleton/>
        ):(
          <ChatList  chats={data?.chats}   onlineUsers={onlineUsers} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} />
        )}
        </Grid>
        <Grid xs={12} sm={8} md={5} lg={6} item height={"100vh"}>
        <WrappedComponent {...props} chatId={chatId}  user={user}/>
        </Grid>
        <Grid item md={4} lg={3} height={"100vh"} sx={{display:{xs:"none",md:"block"},padding:"2rem" ,bgcolor:"#6e5e50",color:"white",marginTop:"5px",borderRadius:"30px"}}>
          <Profile user={user}  />
        </Grid>
      </Grid>
        </>
  )
}
}

export default AppLayout