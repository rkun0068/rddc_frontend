import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import axios from "axios"; // 引入axios库

import Side from "../Components/Side";
import DetectionTable from "../Components/DetectionTable";
import Chart from "chart.js/auto";
import Card from "@mui/material/Card";

const drawerWidth = 240;

export default function Table() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null); // 用于存储从后端获取的数据

  useEffect(() => {
    const fetchDataAndDrawChart = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getTypeCnt"
        ); // 替换为您的后端API地址
        const data = response.data;

        if (data.status === 200) {
          // 从后端获取数据成功
          setChartData(data.result); // 更新图表数据
        } else {
          console.error("Error: Unable to fetch data from the backend.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataAndDrawChart();
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = chartRef.current.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["D00 (横向裂纹) ", "D10 （纵向裂纹） ", "D20 （鳄鱼裂纹）", "D30 （坑洼）"], // 更新labels
          datasets: [
            {
              label: "道路病害统计",
              data: [
                chartData["D00"],
                chartData["D10"],
                chartData["D20"],
                chartData["D30"],
              ], // 更新数据
            },
          ],
        },
      });

      return () => {
        myChart.destroy(); // 清理图表
      };
    }
  }, [chartData]); // 仅在chartData改变时运行

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
        <Card sx={{ maxWidth: 300 }}>
          <canvas id="myChart" ref={chartRef}></canvas>
        </Card>
        <DetectionTable />
      </Box>
    </Box>
  );
}
