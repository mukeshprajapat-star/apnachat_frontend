import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
// import { server } from "../../components/constants/config";

const adminLogin=createAsyncThunk("admin/login",async(secretKey)=>{
    try {
        const config={
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        }
    
        const {data}=await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/admin/verify`,{secretKey},config
        )
        return data.message
    } catch (error) {
        throw error.response.data.message
        
    }
})
const getAdmin=createAsyncThunk("admin/getAdmin",async()=>{
    try {
        const {data}=await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/admin/`,{withCredentials:true,}
        )
        return data.admin
    } catch (error) {
        throw error.response.data.message
        
    }
})
const adminLogout=createAsyncThunk("admin/adminLogout",async()=>{
    try {
        const {data}=await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/admin/logout`,{withCredentials:true,}
        )
        return data.message
    } catch (error) {
        throw error.response.data.message
        
    }
})
export {adminLogin,getAdmin,adminLogout}