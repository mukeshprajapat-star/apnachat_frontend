import { Avatar, Typography,Stack, Box } from "@mui/material";
import React from "react";
import { Face as FaceIcon, AlternateEmail as UserNameIcon,CalendarMonth as CalendarIcon} from "@mui/icons-material";
import moment from 'moment'
import { transformImage } from "../../lib/features";
import { useSelector } from "react-redux";

const SingleProfile = () => {
  const {user} =useSelector((state)=>state.auth)

  return (
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}  sx={{display:{xs:"block",sm:"none"},padding:"6rem" ,bgcolor:"#6e5e50",color:"white",margin:"10px",borderRadius:"30px",width:"400px" ,height:"700px"}}>
        <Avatar
        src={transformImage(user?.avatar?.url)}
          sx={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white",
          }}
        />
        <ProfileCard text={user?.bio} heading={"Bio"} />
        <ProfileCard text={user?.username} heading={"Username"} Icon={<UserNameIcon/>}/>

        <ProfileCard text={user?.name} heading={"Name"} Icon={<FaceIcon/>} />
        <ProfileCard text={moment(user?.createdAt).fromNow()} heading={"Joined"} Icon={<CalendarIcon/>} />
      </Stack>
      
  );
};
const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
        <Typography sx={{fontFamily:"cursive",color:"white"}} variant="body1">{text}</Typography>
        <Typography sx={{fontFamily:"cursive"}} color={"black"} variant="caption">{heading}</Typography>

    </Stack>
  </Stack>
);
export default SingleProfile;
