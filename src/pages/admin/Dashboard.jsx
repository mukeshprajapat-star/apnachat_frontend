import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Loaders } from "../../components/layout/Loaders";
import { DoughnutCharts, LineCharts } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { useError } from "../../hooks/hooks";

const Dashboard = () => {
  const {loading,data,error}=useFetchData(`/api/v1/admin/stats`,"dashboard-stats");
  const {stats}=data || {}
  useError([{isError:error,error:error}])
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0 ",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {moment().format("dddd,D MMMM YYYY")}
        </Typography>
        <NotificationIcon />
      </Stack>
    </Paper>
  );
  const Widgets = <>
  <Stack direction={{
    xs:"column",
    sm:"row"
  }}
  spacing={"2rem"} justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}   > 
  <Widget title={"Users"}  value={stats?.usersCount} Icon={<PersonIcon/>} />
  <Widget title={"Chats"}  value={stats?.totalChatsCount}  Icon={<GroupIcon/>} />
  <Widget title={"Messages"}  value={stats?.messagesCount} Icon={<MessageIcon/>}  />

     </Stack></>;
  return loading ? <Loaders/> :(
    <AdminLayout>
     {loading ? <Skeleton height={"100vh"}/> : (
       <Container component={"main"}>
       {Appbar}

       <Stack direction={{
         xs:"column",
         lg:"row"
       }} flexWrap={"wrap"} justifyContent={"center"} alignItems={{
         xs:"center",
         lg:"stretch"
       }} 
       sx={{ 
         gap:"2rem"
       }}>
         <Paper
           elevation={3}
           sx={{
             padding: "2rem 3.5rem",
             borderRadius: "1rem",
             width: "100%",
             maxWidth: "45rem",
            
           }}
         >
           <Typography variant="h5" margin={"2rem 0 "}>
             Last Messages
           </Typography>
           <Typography variant="h3"><LineCharts value={stats?.messagesChart || []}/></Typography>
         </Paper>
         <Paper
           elevation={3}
           sx={{
             padding: "1rem",
             borderRadius: "1rem",
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             width: {
               xs: "100%",
               sm: "50%",
             },
             position: "relative",
             width: "100%",
             maxWidth: "25rem",
           }}
         >
           <DoughnutCharts labels={["Single Chats ","Groups Chats"]} value={[stats?.totalChatsCount -stats?.groupsCount|| 0,stats?.groupsCount || 0]} />
           <Stack
             position={"absolute"}
             direction={"row"}
             justifyContent={"center"}
             alignItems={"center"}
             spacing={"0.5rem"}
             width={"100%"}
             height={"100%"}
           >
             <GroupIcon/>
             <Typography> VS </Typography>
             <PersonIcon/>
           </Stack>
         </Paper>
       </Stack>
       {Widgets}
     </Container>
     ) }
    </AdminLayout>
  );
};

const Widget=({title,value,Icon})=>
 <Paper elevation={3} sx={{ 
  padding:"2rem",
  margin:" 2rem 0",
  borderRadius:"2rem",
  width:"20rem"
 }}>
  <Stack alignItems={"center"} spacing={"1rem"} >

  <Typography 
  sx={{
    color:"rgba(0,0,0,0.7)",
    borderRadius:"50%",
    border:"5px solid black",
    width:"5rem",
    height:"5rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }}> {value} </Typography>
  <Stack direction={"row"} spacing={"1rem "}  alignItems={"center"}  >
    {Icon} 
  <Typography> {title} </Typography>


  </Stack>



  </Stack>
  
</Paper>
export default Dashboard;
