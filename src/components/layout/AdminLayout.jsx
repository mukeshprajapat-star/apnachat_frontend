import {
  Avatar,
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,

} from "@mui/material";
import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as UserAccountIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {styled } from "@mui/material";
import { Link as LinkComponent, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";
import logo from "../../assets/images/chat.png"


const Link=styled(LinkComponent)`
text-decoration:none;
border-radius:2rem;
padding:1rem 2rem;
color:black;
&:hover{
  color:rgba(0,0,0,0.54)
}`;
const adminTabs = [
  {
    name: "DashBoard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <UserAccountIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },

];

const AdminLayout = ({ children }) => {
  const {isAdmin}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  const logoutHandler=() =>{
    dispatch(adminLogout())
  }
  if(!isAdmin) return <Navigate to="/admin" />  
  const Sidebar = ({ w = "100%" }) => {
    return (
      
      <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
        <div style={{display:"flex"}}>
        <Avatar src={logo}  />
        <Typography variant={"h4"} textTransform={"uppercase"} sx={{marginLeft:'10px'}}>
          Apna Chat
        </Typography>

        </div>
     
        
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab) => (
            <Link key={tab.path} to={tab.path}  sx={
                location.pathname === tab.path && {
                    bgcolor:"bisque",
                    color:"black",
                    ":hover":{
                        bgcolor:"#85929E"

                    }

                }
              }>
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}
             >
                {tab.icon}
                <Typography>{tab.name} </Typography>
              </Stack>
            </Link>
          ))}
           <Link onClick={logoutHandler} >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}
             >
                <ExitToAppIcon/>
                <Typography >Logout </Typography>
              </Stack>
            </Link>
        </Stack>
      </Stack>
    );
  };
  return (
    <>
      <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: {
              xs: " none",
              md: "block",
            },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            bgcolor: "#f5f5f5",
          }}
        >
          {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
          <Sidebar w="50vw" />
        </Drawer>
      </Grid>
    </>
  );
};

export default AdminLayout;
