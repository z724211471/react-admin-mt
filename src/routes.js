import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./views/index/App";
import Shop from "./views/shopplist/shop";
import Bookclass from './views/bookclass/index'
import { Layout, Breadcrumb } from "antd";
import LeftMenu from "./components/leftMenu";
import Booklist from './views/books/booklist';
import Addbook from './views/books/addbook';
const { Header, Content, Footer } = Layout;
class SiderDemo extends React.Component {
  
  render() {
    return (
        <Router >
      <Layout style={{ minHeight: "100vh" }}>
        <LeftMenu />

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                  <Route exact path="/" component={App} />
                  <Route path="/shop" component={Shop} />
                  <Route path='/bookclass' component={Bookclass}></Route>
                  <Route path='/booklist' component={Booklist}></Route>
                  <Route path='/addbook' component={Addbook}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}
export default SiderDemo;
