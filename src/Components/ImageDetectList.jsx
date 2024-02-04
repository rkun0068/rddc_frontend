import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

export default function ImageDetectList() {
  const [itemData, setItemData] = React.useState([]);

  React.useEffect(() => {
    getImageList();
  }, []);

  function getImageList() {
    axios
      .get("http://127.0.0.1:8000/api/getImage")
      .then((response) => {
        const imageList = response.data.msg.map((item) => ({
          img: item.img,
          title: item.title,
        }));
        setItemData(imageList);
      })
      .catch((error) => {
        console.error("捕获错误:", error);
      });
  }

  return (
    <ImageList
      sx={{ width: 800, height: 700, justifyContent: "center" }}
      cols={5}
      rowHeight={200}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
