import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Side from "../Components/Side";
import DetectionTable from "../Components/DetectionTable";

const drawerWidth = 240;

export default function Table() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "white",  // 设置 Drawer 背景颜色为白色
            color: "black",    // 设置文字颜色为黑色
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
       {/* 放置你的组件 */}
       <DetectionTable/>

      </Box>
    </Box>
  );
}
