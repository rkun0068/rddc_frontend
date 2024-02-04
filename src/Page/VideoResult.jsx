import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Side from "../Components/Side";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import axios from "axios";

const drawerWidth = 240;

export default function VideoResult() {
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    // Function to fetch video URL from the backend
    const getVideoURL = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getVideoUrl");
        const URL = response.data.file_url;
        setVideoURL(URL);
      } catch (error) {
        console.error("捕捉错误:", error);
      }
    };

    // Call the function when the component mounts
    getVideoURL();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "white",
            color: "black",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <Side />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Player src={videoURL} />
        
      </Box>
    </Box>
  );
}
