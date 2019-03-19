import React, { Component } from "react";
import { Upload, message, Button, Icon } from "antd";

export default class Ufile extends Component {
  constructor(props) {
    super(props)
  }
  onChange=(info)=>{
    console.log(info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    return (
        <Upload name='avatar' method="post" action='http://localhost:3006/addfile' headers={{authorization:'multipart/form-data'}} onChange={this.onChange}>
          <Button >
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
    );
  }
}
