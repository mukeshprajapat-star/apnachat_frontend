// import { useFileHandler, useInputValidation } from "6pp";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
// import { bgGradient } from "../constants/color";
// import { server } from "../constants/config";
// import { userExists } from "../redux/reducers/auth";
// import { usernameValidator } from "../utils/validators";


import { Container,TextField,Typography ,Paper,Button,Stack,Avatar, IconButton} from '@mui/material'
import React ,{useState} from 'react'
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation,useStrongPassword} from "6pp"
import { userNameValidator } from '../utils/validators';
import { bgGradient } from '../components/constants/Color';
import toast from 'react-hot-toast';
import { userExists } from '../redux/reducers/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", userNameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;


// import { Container,TextField,Typography ,Paper,Button,Stack,Avatar, IconButton} from '@mui/material'
// import React ,{useState} from 'react'
// import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
// import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
// import {useFileHandler, useInputValidation,useStrongPassword} from "6pp"
// import { userNameValidator } from '../utils/validators';
// import { bgGradient } from '../components/constants/Color';
// import toast from 'react-hot-toast';
// import { userExists } from '../redux/reducers/auth';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { server } from '../components/constants/config';
// const Login = () => {
//     const dispatch=useDispatch()
//     const [isLogin,setIsLogin]=useState(true);
//     const [isLoading,setIsLoading]=useState(false)
//     const toggleLogin=()=>{
//         setIsLogin((prev)=>!prev)
//     }
//     const name=useInputValidation("")
//     const bio=useInputValidation("")
//     const username=useInputValidation("",userNameValidator)
//     const password=useInputValidation("")

//     const avatar=useFileHandler("single",10);

//     const handleLogin=async (e)=>{
//         e.preventDefault();
//         const toastId=toast.loading("Logging In...")
//         setIsLoading(true)
//         const config={
//             withCredentials:true,
//             headers:{
//                 "Content-Type" :"application/json"
//             }
//         }
//        try {
//          const {data} =await axios.post(`${server}/api/v1/user/login`,{username:username.value,password:password.value},config)
//          dispatch(userExists(data.user))
//          toast.success(data.success,{id:toastId});

//        } catch (error) {
//         toast.error(error?.response?.data?.message || "Something Went Wrong",{id:toastId})
        
//        }
//        finally{
//         setIsLoading(false)
//        }
//     }
//     const handleSignUp=async (e)=>{
//         e.preventDefault();
//         const toastId=toast.loading("Register...")

//         setIsLoading(true)
//         const formData=new FormData();
//         formData.append("avatar",avatar.file);
//         formData.append("name",name.value);
//         formData.append("bio",bio.value);
//         formData.append("username",username.value);
//         formData.append("password",password.value);

//         const config={
//             withCredentials:true,
//             headers:{ 
//                 "Content-Type":"multipart/form-data"
//             }
//         }

//         try {
//             const {data}=await axios.post(`${server}/api/v1/user/new`,formData,config);
//             dispatch(userExists(data.user))
//             toast.success(data.message,{id:toastId})
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Something Went Wrong",{id:toastId})

            
//         }
//         finally{
//             setIsLoading(false)
//         }
//     }
//   return (
//     <div style={{backgroundImage: bgGradient}}>
//         <Container component={"main"} maxWidth="xs" sx={{height:"800px", justifyContent:"center",alignItems:"center",display:"flex" }} >
//             <Paper elevation={3} sx={{padding:4,display:"flex",flexDirection:"column",alignItems:"center"}}>
//                 {isLogin ? (
//                     <>
//                     <Typography variant="h5" >Login</Typography>
//                     <form onSubmit={handleLogin} style={{width:"100%",marginTop:"1rem"}}>
//                         <TextField required fullWidth label="Username" margin="normal" variant='outlined'  value={username.value} onChange={username.changeHandler}  />
//                         <TextField required fullWidth label="Password" margin="normal" variant='outlined'  value={password.value}
//                   onChange={password.changeHandler} type="password" />
//                         <Button fullWidth sx={{marginTop:"1rem"}} type="submit" variant="contained" color="primary" disabled={isLoading}>Login</Button>
//                         <Typography textAlign="center" m={'1rem'}>OR</Typography>
//                         <Button fullWidth  variant='text' color="secondary" onClick={toggleLogin} disabled={isLoading}>Register</Button>
//                     </form>
//                     </>
//                 ):
//                 (
//                     <>
//                      <Typography variant='h5'>Register</Typography>
//                     <Stack sx={{position:"relative" ,width:"10rem" ,margin:"auto"}}>
//                         <Avatar src={avatar.preview} sx={{width:"10rem" ,height:"10rem" ,objectFit:"contain"}} />
                       

//                         <IconButton component="label" sx={{position:"absolute" ,bottom:"0" ,right:"0",bgColor:"rgba(0,0,0,0.5) " ,":hover":{bgColor:"rgba(255,255,255,0.7)"} }}>
//                             <>
//                             <CameraAltIcon/>
//                             <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
//                             </>
//                         </IconButton>
//                     </Stack>
//                      {avatar.error && (
//                             <Typography m={'1rem auto'} width={"fit-content"} display={'block'} color="error" variant='caption'>
//                                 {avatar.error}
//                             </Typography>
//                         )}
//                     <form onSubmit={handleSignUp} style={{width:"100%",marginTop:"1rem" }}>
//                     <TextField value={name.value} onChange={name.changeHandler} required fullWidth label="Name" margin="normal" variant='outlined'  />
//                         <TextField value={username.value} onChange={username.changeHandler}required fullWidth label="Username" margin="normal" variant='outlined'  />
//                         {username.error && (
//                             <Typography color="error" variant='caption'>
//                                 {username.error}
//                             </Typography>
//                         )}
//                         <TextField value={password.value} onChange={password.changeHandler} required fullWidth label="Password" margin="normal" variant='outlined' type="password" />
//                         {password.error && (
//                             <Typography color="error" variant='caption'>
//                                 {password.error}
//                             </Typography>
//                         )}
//                         <TextField value={bio.value} onChange={bio.changeHandler} required fullWidth label="Bio" margin="normal" variant='outlined'  />
//                         <Button fullWidth sx={{marginTop:"1rem"}} type="submit" variant="contained" color="primary" disabled={isLoading}>Register</Button>
//                         <Typography textAlign="center" m={'1rem'}>OR</Typography>
//                         <Button fullWidth  variant='text' color="secondary" onClick={toggleLogin} disabled={isLoading}>Login</Button>
//                     </form>
//                     </>
//                 )}

//             </Paper>

//         </Container>
//     </div>
//   )
// }

// export default Login