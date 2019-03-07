import React, { Component } from 'react';
import { Button } from 'antd';
import Http from '../../utils/server'
class Bookclass extends Component {
    componentWillMount(){
        Http.post('addclass',{
            classname:'1'
        })
        .then(rec=>{
            console.log(rec);
        })
        .catch(err=>{
            console.log(err);
        })
    }
  render() {
    return (
      <div>
       <Button type="primary">添加分类</Button>
          <p>
           文章分类
          </p>
         
      </div>
    );
  }
}

export default Bookclass;
