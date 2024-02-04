import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import SourceIcon from '@mui/icons-material/Source';
import { useNavigate } from "react-router"

export default function Side(){
  const navigate = useNavigate();
  return(
    <React.Fragment>
    <ListItemButton onClick={()=>navigate("/ImageDetect")}>
      <ListItemIcon>
        <ImageIcon/>
      </ListItemIcon>
      <ListItemText primary="图片检测" />
    </ListItemButton >
    <ListItemButton onClick={()=>navigate("/VideoDetect")}>
      <ListItemIcon>
        <OndemandVideoIcon/>
      </ListItemIcon>
      <ListItemText primary="视频检测" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate("/RealTimeDetect")}>
      <ListItemIcon>
       <VideocamIcon/>
      </ListItemIcon>
      <ListItemText primary="实时检测" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate("/ResultTable")}>
      <ListItemIcon>
       <SourceIcon/>
      </ListItemIcon>
      <ListItemText primary="历史数据" />
    </ListItemButton >
  </React.Fragment>
  )
}


