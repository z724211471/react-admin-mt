import React, { Component } from "react";
import {Table, Divider, message } from "antd";
import Http from "../../utils/server";
import { Link } from "react-router-dom";
import Addbook from "./addbook";
class Booklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabledata: [],
      text: "",
      cname: "",
      cid: 0
    };
  }
  componentWillMount() {
    this.getData();
  }
  getData = () => {
    Http.post("getbook", {})
      .then(rec => {
        console.log(rec.data.data);
        this.setState({ tabledata: rec.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  delclass = id => {
    Http.post("delbook", {
      id: id
    })
      .then(rec => {
        if (rec.data.code === 200) {
          this.setState({
            tabledata: this.state.tabledata.filter(x => x.id !== id)
          });
          message.success(rec.data.msg);
        } else {
          message.warning(rec.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  addClass = () => {
    if (!this.state.text.length) {
      message.error("请输入分类名称");
      return;
    }
    let vm = this;
    console.log(vm);
  };
  handleupdate = (id) => {
  
  };
  handletext = e => {
    this.setState({ text: e.target.value });
  };
  setname = e => {
    this.setState({ cname: e.target.value });
  };

  render() {
    const columns = [
      {
        title: "文章标题",
        dataIndex: "title",
        key: "title",
        render: (text, record) => <p>{text}</p>
      },
      {
        title: "创建时间",
        dataIndex: "createtime",
        key: "createtime",
        render: (text, record) => <p>{text}</p>
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Link to={{pathname:'/addbook',state:record.id}}>
            编辑
            </Link>
            <Divider type="vertical" />
            <a onClick={this.delclass.bind(this, record.id)}>删除</a>
          </span>
        )
      }
    ];

    return (
      <div>
        <div>
          <Link to="/addbook">添加文章</Link>
          {/* <Button type="primary" onClick={this.addClass.bind(this)}>
            添加文章
          </Button> */}
        </div>
        {/* <Model></Model> */}
        <Table
          columns={columns}
          dataSource={this.state.tabledata}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Booklist;
