import React ,{useState} from "react";
import UserItem from "../shared/UserItem";
import { Typography, Dialog, DialogTitle, Stack, Button, Skeleton } from "@mui/material";
import { useAsyncMutation, useError } from "../../hooks/hooks";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({isLoadingAddMember, chatId }) => {
  const dispatch=useDispatch();
  const {isAddMember}=useSelector((state)=>state.misc);

  const {isLoading,data,isError,error}=useAvailableFriendsQuery(chatId)
  const [addMembers,isLoadingAddMembers]=useAsyncMutation(useAddGroupMembersMutation)

  const [selectMembers, setSelectMembers] = useState([]);


  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  };
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...",{members:selectMembers,chatId})
    closeHandler()
  };
  useError([{isError,error}])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"1rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (<Skeleton/> ):data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem key={i._id} user={i} handler={selectMemberHandler}  isAdded={selectMembers.includes(i._id)} />
            ))
          ) : (
            <Typography alignItems={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color={"error"} onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
