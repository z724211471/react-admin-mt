import React, { Component } from "react";
import {
  Upload, message, Button, Icon,
} from 'antd';
import './index.css'
import WrappedNormalLoginForm from './form'



class Login extends Component {
    constructor(props){
        super(props);
    }

  render() {
     return (
     <div>
       <WrappedNormalLoginForm  {...this.props}   />
       </div>)
  }
}

export default Login;
