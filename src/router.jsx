import { createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home";
import ImageDetection from "./Page/ImageDetection";
import VideoDetection from "./Page/VideoDetection";
import RealTimeDetection from "./Page/RealTimeDetection";
import ImageResult from "./Page/ImageResult";
import Table from "./Page/Table";
import VideoResult from "./Page/VideoResult";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path:"/ImageDetect",
    element: <ImageDetection/>
  },
  {
    path:"/VideoDetect",
    element: <VideoDetection/>
  },
  {
    path:"/RealTimeDetect",
    element: <RealTimeDetection/>
  },
  {
    path:"/ImageResult",
    element: <ImageResult/>
  },
  {
    path:"/ResultTable",
    element: <Table/>
  },
  {
    path:"/VideoResult",
    element: <VideoResult/>

  },

]);

export default router;
