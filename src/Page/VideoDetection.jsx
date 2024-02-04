import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Side from "../Components/Side";
import { MonitorOutlined } from "@ant-design/icons";
import { FloatButton, Spin } from "antd";
import VideoUpload from "../Components/VideoUpload";
import { useNavigate } from "react-router";
import axios from "axios"; // Import axios for making HTTP requests
const drawerWidth = 240;

export default function VideoDetection() {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = React.useState(false);
  const handleDetectClick = async () => {
    try {
      setIsDetecting(true); // Show Spin component while detecting

      // Make an API request to the backend
      await axios.post("http://127.0.0.1:8000/api/detectVideo");

      // Once the request is successful, navigate to ImageResult
      navigate("/VideoResult");
    } catch (error) {
      console.error("Error detecting video:", error);
    } finally {
      setIsDetecting(false); // Hide Spin component after detecting or in case of an error
    }
  };
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
            bgcolor: "white", // 设置 Drawer 背景颜色为白色
            color: "black", // 设置文字颜色为黑色
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
        <div className="example" style={{ textAlign: "center" }}>
          <Spin tip="模型处理中. . ." spinning={isDetecting} size="middle">
            <div className="content" />
          </Spin>
        </div>

        <Toolbar />
        <VideoUpload />
      </Box>
      <FloatButton
        description="检测"
        icon={<MonitorOutlined />}
        onClick={handleDetectClick}
      />
    </Box>
  );
}
