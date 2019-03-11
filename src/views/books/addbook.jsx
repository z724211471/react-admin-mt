import React, { Component } from "react";
import { Button, Input, message, Select } from "antd";
import Http from "../../utils/server";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.less";
const Option = Select.Option;
class Addbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      classdata: [],
      classid: "",
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ text: value });
  }
  handleTitle(e) {
    this.setState({ title: e.target.value });
  }
  componentWillMount() {
    this.getData();
  }
  handleClass = e => {
    this.setState({ classid: e });
  }
  handelSave=()=>{
    Http.post('addbook',{
      title:this.state.title,
      text:this.state.text,
      class:this.state.classid,
    })
    .then(rec=>{
      if(rec.data.code===200){
      message.success(rec.data.msg);
      this.props.history.goBack()
      }else{
        message.warning(rec.data.msg);
      }
        
    })
    .catch(err=>{
      message.error('错误');
    })
  }
  getData = () => {
    Http.post("getclass", {})
      .then(rec => {
        this.setState({ classdata: rec.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Input
          placeholder="请输入标题"
          className="mbotton"
          value={this.state.title}
          onChange={this.handleTitle.bind(this)}
        />
        <Select
          defaultValue="请选择"
          style={{ width: 120, marginBottom: 20, marginTop: 20 }}
          onChange={this.handleClass}
        >
          {this.state.classdata.map((x, i) => (
            <Option value={x.id} key={i}>
              {x.classname}
            </Option>
          ))}
        </Select>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
          className="mbotton"
        />
        <Button type="primary" onClick={this.handelSave}>保存</Button> <Button>取消</Button>
      </div>
    );
  }
}

export default Addbook;
