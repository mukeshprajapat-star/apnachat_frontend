import { Grid,Skeleton,Stack } from '@mui/material'
import React from 'react'
import { BounsingSkeleton } from '../styles/StyledComponents'

export const Loaders = () => {
  return (
    <div>
         <Grid container height={"calc(100vh-4rem)"} >

<Grid sm={4} md={3} sx={{display:{xs:"none",sm:"block"}}} item xs={4} height={"100vh"}>
  <Skeleton variant='rectangular' height={"100vh"}/>
</Grid>
<Grid xs={12} sm={8} md={5} lg={6}  item height={"100vh"}>
    <Stack spacing={'1rem'} marginLeft={"30px"} marginRight={"30px"}>
{Array.from({length:10}).map((_,index)=>(
    <Skeleton  key={index}  variant="rounded" height={"5rem"}/>
)) }
</Stack>

</Grid>
<Grid item md={4} lg={3} height={"100vh"} sx={{display:{xs:"none",md:"block"} }}>
<Skeleton variant='rectangular' height={"100vh"}/>

</Grid>
</Grid>
    </div>
  )
}
export const TypingLoader=()=>{
  return (
    <Stack spacing={"0.5rem"} direction={"row"} padding={"0.5rem"} justifyContent={"center"}>  
    <BounsingSkeleton variant='circular' width={15} height={15} style={{animationDelay:"0.1s"}}/>
    <BounsingSkeleton variant='circular' width={15} height={15} style={{animationDelay:"0.2s"}}/>
    <BounsingSkeleton variant='circular' width={15} height={15} style={{animationDelay:"0.4s"}}/>
    <BounsingSkeleton variant='circular' width={15} height={15} style={{animationDelay:"0.6s"}}/>


    </Stack>
  )

}