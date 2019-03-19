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
      title: "",
      bid: this.props.location.state || 0,
      defaultValue: ""
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
    console.log(this.state.bid);
    this.getData();
    if (this.state.bid) {
      this.getBook();
    }
  }

  getBook = () => {
    Http.post("getbook", {
      id: this.state.bid
    }).then(rec => {
      let bdata = rec.data.data[0];
      let classname = this.state.classdata
        .filter(x => {
          if (x.id === bdata.classid) return x;
        })
        .map(x => x.classname)
        .toString();
        console.log(classname);
      this.setState({
        text: this.escape2Html(bdata.text),
        title: bdata.title,
        classid: bdata.classid,
        defaultValue: classname,
      });
    });
  };
  escape2Html = str => {
    let arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(t) {
      return arrEntities[t];
    });
  };
  handleClass = e => {
    this.setState({ classid: e });
  };
  handelSave = () => {
    Http.post("addbook", {
      title: this.state.title,
      text: this.state.text,
      class: this.state.classid,
      id:this.state.bid,
    })
      .then(rec => {
        if (rec.data.code === 200) {
          message.success(rec.data.msg);
          this.props.history.goBack();
        } else {
          message.warning(rec.data.msg);
        }
      })
      .catch(err => {
        message.error("错误");
      });
  };
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
    console.log(this.state.defaultValue)
    return (
      <div>
        <Input
          placeholder="请输入标题"
          className="mbotton"
          value={this.state.title}
          onChange={this.handleTitle.bind(this)}
        />
        <Select
          value={this.state.defaultValue}
          placeholder='请选择'
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
        <Button type="primary" onClick={this.handelSave}>
          保存
        </Button>{" "}
        <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
      </div>
    );
  }
}

export default Addbook;
