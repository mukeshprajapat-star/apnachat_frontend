import React, { memo, useState } from "react";
import { Link } from "../styles/StyledComponents";
import { Badge, Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import {motion} from "framer-motion"



const ChatItem = ({
  avatar= [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  
  return(
  <>
  <Link to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)} sx={{padding:"0"}}  >
    <motion.div
     initial={{opacity:0,y:"-100%"}} 
     whileInView={{opacity:1,y:0}}
     transition={{delay:index * 0.1}}
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: sameSender ? "#75889e" : "white",
        color: sameSender ? "white" : "unset",
        position:"relative",
        borderRadius:"50px",
        marginTop:"5px",
      }}
    >
      <Badge  badgeContent={isOnline && (
            <Box sx={{
                width:"10px",
                height:"10px",
                borderRadius:"50%",
                backgroundColor:"green",
                position:"absolute",
                top:"50%",
                right:"2rem",
                transform:"translateY(-50%)"
                
            }}/>
            
        )}>
      <AvatarCard avatar={avatar}/>
      </Badge>
      
        <Stack>
            <Typography sx={{fontFamily:"cursive"}}> 
                {name}
            </Typography>
           
        </Stack>
        
         {newMessageAlert && (
                <Badge badgeContent={newMessageAlert.count}  color="success" sx={{marginLeft:"25px"}}/>
            )}

    </motion.div>
  </Link>
  </>
)};

export default memo(ChatItem);
