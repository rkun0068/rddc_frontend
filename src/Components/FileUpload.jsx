import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Button, Divider } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const FileUpload = () => {
  const [fileList, setFileList] = useState([]);

  const props = {
    name: "file",
    multiple: true,
    fileList,
    customRequest: ({ file, onSuccess, onError }) => {
      // 使用自定义请求，但不真正发送请求，等到用户点击上传按钮时再手动发送请求
      onSuccess();
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    async onRemove(file) {
      // 可选：在移除文件时可以在这里添加自定义逻辑
      setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    },
    async beforeUpload(file, fileList) {
      // 可选：在上传之前可以在这里添加自定义逻辑
      return true;
    },
    async customRemove(file) {
      // 可选：使用自定义删除方法，如果不提供默认使用 antd 的删除方法
      setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    },
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("请先选择文件再上传");
      return;
    }

    const formData = new FormData();

    // 将所有文件添加到 FormData 对象中
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    try {
      // 发送一次性请求
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 200) {
        message.success("文件上传成功.");
        // 清空文件列表
        setFileList([]);
      } else {
        message.error("文件上传失败.");
      }
    } catch (error) {
      message.error("文件上传失败.");
    }
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击这里上传图片</p>
        <p className="ant-upload-hint">支持单文件上传和多文件上传</p>
      </Dragger>
      <Divider />

      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          size="large"
          icon={<CloudUploadOutlined />}
          onClick={handleUpload}
          style={{ display: "block", margin: "auto" }}
        >
          上传
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
