import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { Image, Card } from "antd";
import ReactJson from 'react-json-view'
export default function DetectionTable() {
  const [DetectionResults, setDetectionResults] = React.useState([]);

  React.useEffect(() => {
    getResults();
  }, []);

  function getResults() {
    axios.get("http://127.0.0.1:8000/api/detectInfo").then((response) => {
      const results_info = response.data.data.map((item) => ({
        img_url: item.img_url,
        result: item.result,
        created: item.created,
      }));
      setDetectionResults(results_info);
    });
  }

  return (
    <React.Fragment>
      <Title>检测结果信息</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>检测图片</TableCell>
            <TableCell>数据</TableCell>
            <TableCell align="right">创建时间</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DetectionResults.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image width={200} src={row.img_url} />
              </TableCell>
              <TableCell>
                {/* <Card bordered={false} style={{ width: 300 }}>
                {row.result}
                </Card> */}
                <ReactJson src={JSON.parse(row.result)} name="data" />

               
              </TableCell>
              <TableCell align="right">{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
