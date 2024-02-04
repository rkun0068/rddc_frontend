import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const VideoUpload = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://127.0.0.1:8000/api/upload',
    // 调整以下两个参数，根据你的需求配置
    maxCount: 1,  // 最大上传文件数量
    maxFileSize: 1024 * 1024 * 1000,  // 最大上传文件大小 (100 MB)
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击这里上传视频</p>
      <p className="ant-upload-hint">
        上传单个视频，支持大文件上传
      </p>
    </Dragger>
  );
};

export default VideoUpload;
