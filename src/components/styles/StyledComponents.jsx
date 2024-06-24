import React from 'react'
 import { Skeleton, keyframes, styled } from '@mui/material'
import { Link as LinkComponent} from 'react-router-dom'
import { grayColor } from '../constants/Color';

export const VisuallyHiddenInput = styled("input")({
border:0,
height:1,
width:1,
position:"absolute",
margin:-1,
overflow:'hidden',
padding:0,
whiteSpace:'nowrap',
clip:'rect(0,0,0,0) '
});

export const Link=styled(LinkComponent)`
text-decoration:none;
color:black;
padding:1rem;

`
;
export const InputBox=styled("input")`
    width:100%,
    height:100%,
    border:none,
    outline:none,
    padding:0 3rem ,
    border-radius:1.5rem,
    background-color:${grayColor},
    `
    ;
export const SearchField=styled("input") `
padding:1rem 2rem ;
width:20vmax;
border:none;
outline:none;
border-radius:1.5rem;
background-color:#f1f1f1;
font-size:1.1rem`

export const CurveButton=styled("button") `
padding:1rem 2rem ;
width:20vmax;
border:none;
outline:none;
cursor:pointer;
background-color: #262626;
color:white;
border-radius:1.5rem;
font-size:1.1rem
&:hover
{
    background-color:rgba(0,0,0,0.8)
}`

const bounceAnimation=keyframes`
0% {transform:scale(1);
50% {transform:scale(1.5)};
100% {transform :scale(1)};
}`
export const BounsingSkeleton=styled(Skeleton)(()=>({
    animation:`${bounceAnimation} 1s infinite`
})) 