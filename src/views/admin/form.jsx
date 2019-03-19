import React, { Component } from "react";
import { Form, Icon, Input, Button, message,} from "antd";
import "./index.css";
import md5 from "blueimp-md5";
import { Link } from "react-router-dom";
import Http from "../../utils/server";
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", this.props);
        Http.post("login", {
          username: md5(values.userName),
          password: md5(values.password)
        })
          .then(rec => {
            if (rec.data.code === 200) {
              message.success(rec.data.msg);
              this.props.history.push("/");
            } else {
              message.warning(rec.data.msg);
            }
          })
          .catch(err => {
            message.error("登录失败");
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
          {/* {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: false
          })(<Checkbox>Remember me</Checkbox>)} */}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
          Or <Link to="/re">去注册</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
