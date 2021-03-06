import React, { Component } from "react";
import { Button, Input, Table, Divider, message } from "antd";
import Http from "../../utils/server";
import Model from "../../utils/model";
import {connect} from 'react-redux'
import {getlist,dellist} from '../redux/addBooks'

class Bookclass extends Component {
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
    console.log(this.props);
    this.getData();
    this.props.getlist();
    console.log(this.props.value);
  } 
  getData = () => {
 
    Http.post("getclass", {})
      .then(rec => {
     
        this.setState({ tabledata: rec.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  delclass = id => {
    this.props.delbook(id);
    // Http.post("delclass", {
    //   id: id
    // })
    //   .then(rec => {
    //     if (rec.data.code === 200) {
         
    //         this.setState({ tabledata: this.state.tabledata.filter(x=>x.id!==id) });
    //         message.success(rec.data.msg);
    //       } else {
    //         message.warning(rec.data.msg);
    //       }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  addClass = () => {
  
    if (!this.state.text.length) {
      message.error("请输入分类名称");
      return;
    }
    let vm = this;
    console.log(vm);
    Http.post("addclass", {
      classname: this.state.text
    })
      .then(rec => {
        if (rec.data.code === 200) {
          vm.getData();

          this.setState({ text: "" });
          message.success(rec.data.msg);
        } else {
          message.warning(rec.data.msg);
        }
      })
      .catch(err => {
        message.error("添加失败");
        console.log(err);
      });
  };
  updateclass = (id, text) => {
    this.setState({ cid: id, cname: text });
  };
  handletext = e => {
    this.setState({ text: e.target.value });
  };
  setname = e => {
    this.setState({ cname: e.target.value });
  };
  saveclass() {
    if (!this.state.cname.length) {
      message.error("请输入分类名称");
      return;
    }
    Http.post("updateclass", {
      id: this.state.cid,
      classname: this.state.cname
    })
      .then(rec => {
          if(rec.data.code===200){
            this.setState({
                tabledata: this.state.tabledata.map(x => {
                  return x.id === this.state.cid
                    ? { id: x.id, classname: this.state.cname }
                    : x;
                })
              });
              this.setState({ cid: 0,cname:"" });
              message.success(rec.data.msg)
          }else{
            message.warning(rec.data.msg)
          }
      })
      .catch(err => {
        message.error('更新发生错误');
      });
  }
  render() {
    const columns = [
      {
        title: "分类名称",
        dataIndex: "classname",
        key: "classname",
        render: (text, record) =>
          this.state.cid === record.id ? (
            <Input
              placeholder="请输入分类名称"
              value={this.state.cname}
              onChange={this.setname.bind(this)}
            />
          ) : (
            <p>{text}</p>
          )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            {this.state.cid === record.id ? (
              <a onClick={this.saveclass.bind(this)}>保存</a>
            ) : (
              <a
                onClick={this.updateclass.bind(
                  this,
                  record.id,
                  record.classname
                )}
              >
                编辑
              </a>
            )}

            <Divider type="vertical" />
            <a onClick={this.delclass.bind(this, record.id)}>删除</a>
          </span>
        )
      }
    ];

    return (
      <div>
        <div>
          {" "}
          <Input
            placeholder="请输入文字分类"
            style={{ width: "80%" }}
            type="text"
            value={this.state.text}
            onChange={this.handletext}
          />{" "}
          <Button type="primary" onClick={this.addClass.bind(this)}>
            添加分类
          </Button>
        </div>
        {/* <Model></Model> */}
        <Table
          columns={columns}
          dataSource={this.props.value}
          rowKey="id"
        />
      </div>
    );
  }
}
let mapStateToProps=(state)=>{
  console.log(state);
  return {
    value: state
  }
}
let mapDispatchToProps=(dispatch)=>{
  return {
    getlist:()=>{dispatch(getlist())},
    delbook:(bid)=>{dispatch(dellist(bid))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps,null)(Bookclass);
