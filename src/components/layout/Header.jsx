import { AppBar, Avatar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { orange } from '../constants/Color'
import {Add as AddIcons,Group as GroupIcon,Menu as  MenuIcon, Search as SearchIcon ,Logout as LogoutIcon,Notifications as NotificationIcon} from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc';
import { resetNotificationCount } from '../../redux/reducers/chat';
import photo from "../../assets/images/chat.png"
import { transformImage } from '../../lib/features';

const SearchDialog=lazy(()=>import("../specific/Search"))
const NotificationsDialog=lazy(()=>import("../specific/Notifications"))
const NewGroupDialog=lazy(()=>import("../specific/NewGroup"))




const Header = () => {
    const navigate =useNavigate();
    const dispatch=useDispatch()
    const {isSearch,isNotification,isNewGroup} =useSelector((state)=>state.misc);
    const {user} =useSelector((state)=>state.auth)
   
    const {notificationCount} =useSelector((state)=>state.chat);


    const handleMobile=()=> dispatch(setIsMobile(true))
    const openSearchDialog=()=> dispatch(setIsSearch(true));

    const opeNewGroup=()=>{
        dispatch(setIsNewGroup(true))
    }
    const navigateToGroups=()=>{
       navigate("/groups")
    }
    const LogoutHandler=async ()=>{
      try {
       const {data}= axios.get(`/api/v1/user/logout`,{withCredentials:true})
        dispatch(userNotExists())
        toast.success(data.message);
        
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something Went Wrong")
        
      }
    }
    const openNotification=()=>{
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount())
    }
  return (
    <div>
        <Box sx={{flexGrow:1}} height={"4.5rem"}>
            <AppBar position="static" sx={{bgcolor:"#8c5e57",borderRadius:"30px",height:"4.5rem",paddingTop:"4px"}}>
                <Toolbar>
                    <Avatar src={photo} />
                    <Typography variant='h6' sx={{display:{xs:'none',sm:"block"},marginLeft:"10px",fontFamily:"cursive"}}>Apna Chat</Typography>
        

                <Box sx={{display:{xs:'block',sm:"none" }}}>
                    <div style={{display:'flex'}}>
                    <IconButton color="inherit" onClick={handleMobile}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/profile"> <Avatar src={transformImage(user?.avatar?.url)}/> </Link>
                   
                    </div>
                   

                </Box>
                <Box sx={{flexGrow:1}}/>
                    <Box>
                    <IconBtn title="Search" icon={ <SearchIcon />} onClick={openSearchDialog} />
                    <IconBtn title="New Group" icon={ <AddIcons/>} onClick={opeNewGroup} />
                    <IconBtn title="Manage Groups" icon={ <GroupIcon/>} onClick={navigateToGroups} />
                    <IconBtn value={notificationCount}  title="Notifications" icon={ <NotificationIcon/>} onClick={openNotification}/>

                    <IconBtn title="Logout" icon={ <LogoutIcon/>} onClick={LogoutHandler} />
                    </Box>

                </Toolbar>

            </AppBar>

        </Box>
        {isSearch && (
           <Suspense fallback={<Backdrop open/>}>
            <SearchDialog/>
           </Suspense>
        )

        }
          {isNotification && (
           <Suspense fallback={<Backdrop open/>}>
            <NotificationsDialog/>
           </Suspense>
        )

        }
          {isNewGroup && (
           <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog/>
           </Suspense>
        )

        }
    </div>
  )
}

const IconBtn=({title,onClick,icon  ,value})=>{
    return (
        <Tooltip title={title} >
            <IconButton color="inherit" size="large" onClick={onClick}>
                    {value ? <Badge badgeContent={value} color="error" > {icon} </Badge> : icon} 
                    </IconButton>
            </Tooltip>
    )

}

export default Header