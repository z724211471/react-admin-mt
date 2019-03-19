import React, { Component } from "react";

import './index.css'
import WrappedNormalREForm from './reform'

class Register extends Component {
    constructor(props){
        super(props);
    }

  render() {
     return (
     <div>
         <WrappedNormalREForm {...this.props}  />
       </div>)
  }
}

export default Register;
