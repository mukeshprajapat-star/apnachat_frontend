import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useError } from "../../hooks/hooks";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const dispatch=useDispatch();
  const {isNewGroup} =useSelector((state)=>state.misc)
  const {isLoading ,error,data,isError} =useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup]=useAsyncMutation(useNewGroupMutation)
  const groupName = useInputValidation("");

  const [selectMembers,setSelectMembers]=useState([]);
  const errors=[{isError,error}];
  useError(errors)


  const selectMemberHandler=(id)=>{
    setSelectMembers((prev)=> prev.includes(id) ? prev.filter((currElement)=>currElement !== id):[...prev,id])

  }

  const submitHandler=()=>{
    if(!groupName.value) return toast.error("Group name is required");
    if(selectMembers.length < 2) return toast.error("Please select atleast 3 members");
    newGroup("Creating New Group..." ,{name:groupName.value,members:selectMembers})

    closeHandler();

  }

  const closeHandler=()=>{
    dispatch(setIsNewGroup(false))
  }
  return (
    <div>
       <Dialog open={isNewGroup}  onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>

        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant="body1">
          Members
        </Typography>
        <Stack>
        {
          isLoading ? (<Skeleton/> ):(
            data?.friends?.map((i)=>(
              <UserItem  user={i} key ={i._id} handler={selectMemberHandler} isAdded={selectMembers.includes(i._id)} />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>

      
      </Stack>{" "}
    </Dialog>
    </div>
  )
}

export default NewGroup