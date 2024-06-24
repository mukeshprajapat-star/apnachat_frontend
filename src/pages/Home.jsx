import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography ,Box} from '@mui/material'
import { grayColor } from '../components/constants/Color'


const Home = () => {
  return (
    <div>
      <Box bgcolor={grayColor} height={"100vh"}>

     
      <Typography p={"2rem"}  variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
      </Box>
    </div>
  )
}

export default AppLayout() (Home)