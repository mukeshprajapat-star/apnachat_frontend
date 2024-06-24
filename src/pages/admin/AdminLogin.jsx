import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { bgGradient } from '../../components/constants/Color'

import { useInputValidation } from "6pp"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { adminLogin, getAdmin } from '../../redux/thunks/admin'


const AdminLogin = () => {
    const {isAdmin}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const secretKey=useInputValidation("")


    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))
    }
    useEffect(() => {
        dispatch(getAdmin())

    }, [dispatch])
    

    if(isAdmin) return <Navigate to="/admin/dashboard" />

  return (
    <div style={{backgroundImage: bgGradient}}>
    <Container component={"main"} maxWidth="xs" sx={{height:"800px", justifyContent:"center",alignItems:"center",display:"flex" }} >
        <Paper elevation={3} sx={{padding:4,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Typography variant="h5" >Admin Login</Typography>
                <form onSubmit={submitHandler} style={{width:"100%",marginTop:"1rem"}}>
                    <TextField required fullWidth label="Secret Key" margin="normal" variant='outlined' type="password" value={secretKey.value} onChange={secretKey.changeHandler} />
                    <Button   fullWidth sx={{marginTop:"1rem", }} type="submit" variant="contained" color="primary" >Login</Button>
                </form>
           

        </Paper>

    </Container>
</div>
    
    
    )
}

export default AdminLogin