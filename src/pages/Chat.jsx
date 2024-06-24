import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor, orange } from "../components/constants/Color";
import { Stack ,IconButton, styled, TextField, Skeleton} from "@mui/material";
import { AttachFile   as AttachFileIcon, Send as SendIcon} from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../components/constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useError, useSocketEvent } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";
import "./chat.css"
const Chat = ({chatId,user}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
  const [page,setPage]=useState(1)
  const [fileMenuAnchor,setFileMenuAnchor]=useState(null);
  const [IamTyping,setIamTyping]=useState(false);
  const [userTyping,setUserTyping]=useState(false);
  const typingTimeout=useRef(null)

  const containerRef = useRef(null);
  const bottomRef=useRef(null)
  const socket =getSocket();

  const oldMessageChunk=useGetMessagesQuery({chatId,page});
  const  {data:oldMessages,setData:setOldMessages} =useInfiniteScrollTop(containerRef,oldMessageChunk.data?.totalPages,page,setPage,oldMessageChunk.data?.messages)


  const chatDetails=useChatDetailsQuery({chatId,skip:!chatId});

  const errors=[{isError:chatDetails.isError,error:chatDetails.error},
    {isError:oldMessageChunk.isError,error:oldMessageChunk.error}
  ]
  
  const members = chatDetails?.data?.chat?.members;

  const messageOnChange=(e) =>{
    setMessage(e.target.value);
    if(!IamTyping) {
    socket.emit(START_TYPING,{members,chatId});
    setIamTyping(true)
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current)

    typingTimeout.current=setTimeout(()=>{
      socket.emit(STOP_TYPING,{members,chatId})
      setIamTyping(false)
    },[2000])

  }
  const handleFileOpen=(e) =>{
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget)
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!message.trim()) return 
  
  // Emitting the message to the server 
  socket.emit(NEW_MESSAGE,{chatId,members,message})
  setMessage("")
  }
  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members})
    dispatch(removeNewMessagesAlert(chatId)) 
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED,{userId:user._id,members})
}
  }, [chatId])
  useEffect(() => {
    if(bottomRef.current)
    bottomRef.current.scrollIntoView({behavior:"smooth"})
  }, [messages])
  useEffect(() => {
    if(chatDetails.isError) return navigate("/")
  }, [chatDetails.isError])
  
  

  const newMesagesListener=useCallback((data)=>{
    if(data.chatId !== chatId) return ;
    setMessages((prev)=>[...prev,data.message]);
  },[chatId]);

  const startTypingListener=useCallback((data)=>{
    if(data.chatId !== chatId) return ;
    setUserTyping(true)
  },[chatId]);

  const stopTypingListener=useCallback((data)=>{
    if(data.chatId !== chatId) return ;
    setUserTyping(false)
  },[chatId]);

  const alertListener=useCallback(
    (data)=>{

      if(data.chatId !== chatId) return ;

    const messageForAlert={
      content:data.message,
      sender:{
          _id:"sdjkkajchsahjsshjxhH",
          name:"Admin"
      },
      chat:chatId,
      createdAt:new Date().toISOString()
  }
  setMessages((prev)=>[...prev,messageForAlert])
   },[chatId]);

  const eventHandler={
    [ALERT]:alertListener,
    [NEW_MESSAGE]:newMesagesListener,
    [START_TYPING]:startTypingListener,
    [STOP_TYPING]:stopTypingListener
  };

  useSocketEvent(socket,eventHandler);

  const allMessages=[...oldMessages,...messages]
  useError(errors)


  
  return chatDetails.isLoading ? (
    <Skeleton/>
  ) :(
    <Fragment >
      <div className="container"> 
      <Stack ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#f2f2f2"}
        height={"73vh"}
        sx=
        {{
          overflowX: "hidden",
          overflowY: "auto",
          marginTop:"5px",
          borderRadius:"25px",
          border:"2px solid #b3b3cc",
          margin:"5px",         
        }}
        >  
          {allMessages.map((i)=>(
            <MessageComponent key={i._id}  message={i} user={user} /> 
          ))}
          {userTyping && <TypingLoader/>}
          <div ref={bottomRef}/>
      </Stack>

        <form style={{height:"13%"}} onSubmit={submitHandler}>
          <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
            <IconButton sx={{ 
              position:"absolute",
              left:"1.5rem",
              rotate:"30deg",
              color:"black"
            }}
             onClick ={handleFileOpen} >
              <AttachFileIcon/>
            </IconButton>
            <input style={{
               width:"100vh",
               height:"10vh",
               border:"1px solid lightblue",
               outline:"none",
               padding:"0 3rem" ,
               borderRadius:"1.5rem",
               backgroundColor:grayColor,

            }} value={message} onChange={messageOnChange}   placeholder="Type Message Here ..." />
            <IconButton type="submit" sx={{
              rotate:"-30deg",
              backgroundColor:"#ff0066",
              color:"white",
              marginLeft:"1rem",
              padding:'0.5rem',
              "&:hover":{
                bgcolor:"error.dark"
              }
            }}>
              <SendIcon/>
            </IconButton>

          </Stack>

        </form>
        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
        </div>
    </Fragment>
  );
};

export default AppLayout()(Chat);
