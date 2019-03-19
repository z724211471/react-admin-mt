import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import "./index.css";
import md5 from "blueimp-md5";
import Http from "../../utils/server";
class REForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", this.props);
        console.log(md5(values.userName));
        Http.post("adduser", {
          username: md5(values.userName),
          password: md5(values.password)
        })
          .then(rec => {
            if (rec.data.code === 200) {
              message.success(rec.data.msg);
              this.props.history.push('/login')
            } else {
              message.warning(rec.data.msg);
            }
          })
          .catch(err => {
            message.error("注册失败");
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入用户名!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalREForm = Form.create({ name: "normal_login" })(REForm);

export default WrappedNormalREForm;
