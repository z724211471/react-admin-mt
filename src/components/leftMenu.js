import React from "react";
import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
class LeftMenu extends React.Component {

  state = {
    collapsed: false,
    currentUrl : this.props.location.pathname,
  };
  componentDidMount(){
    
   
  }
 
  handleSelectKey(item){
    console.log(item);
    this.setState({ currentUrl:item.key },()=>{
      console.log(this.state.currentUrl);
    });
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[this.state.currentUrl]} mode="inline" onSelect={this.handleSelectKey.bind(this)}>
          <Menu.Item key="/">
            <Icon type="pie-chart" />
            <span>图谱</span>
          </Menu.Item>
          <Menu.Item key="/shop">

          <Icon type="desktop" />
            <Link to="/shop" style={{'display':'inline-block'}}>
            商品管理</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="3">前台用户</Menu.Item>
            <Menu.Item key="4">后台用户</Menu.Item>
            <Menu.Item key="5">二逼用户</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="/bookclass"><Link to="/bookclass" style={{'display':'inline-block'}}>
            文章分类</Link></Menu.Item>
            <Menu.Item key="8">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>文件管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(LeftMenu);
