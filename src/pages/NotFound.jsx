import { Error as ErrorIcon} from '@mui/icons-material'
import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{height:"100vh"}}> 
      <Stack alignItems={"center"} spacing={"2rem"}  height="100%" justifyContent={"center"}>
      <ErrorIcon sx={{fontSize:"5rem"}} />
      <Typography variant='h1'>404</Typography>
      <Typography variant='h3'>Not Found</Typography>
      <Link to="/">Go back to home</Link>
      </Stack>
    </Container>
  )
}

export default NotFound