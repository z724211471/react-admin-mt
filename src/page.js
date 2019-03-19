import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import App from "./views/index/App";
import Login from "./views/admin/login";
import Register from "./views/admin/registered";
import SiderDemo from "./routes";
import jsCookie from "js-cookie";
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: jsCookie.get("name") || 0
    };
  }
  componentWillMount() {
    jsCookie.set("name", 0);
    console.log(this.state.userid);
  }
  render() {
    return (
      <Router>
        <div>
        <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/re" component={Register} />
          <PrivateRoute path="/" component={SiderDemo} />
        </Switch>
        </div>
      </Router>
    );
  }
}
export default Page;
