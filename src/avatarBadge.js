import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import image from "./like.png"


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  border: `2px solid ${theme.palette.background.paper}`,
}));
{/* <img src={Image} style={{height:"150px", width:"150px", backgroundColor:"grey", borderRadius:"50%"}}></img> */}
export default function BadgeAvatars() {
  return (

      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar src={image}/>
        }
      >
        <Avatar sx={{ bgcolor: deepPurple[500] ,height:40}}/>
      </Badge>
  );
}
