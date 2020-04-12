import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routerHome } from "./routes";
import HomeTemplate from "./screens/User";
import Login from "./screens/User/login/Login";
import SignUp from "./screens/User/sign-up/SignUp";
import Checkout from "./screens/User/checkout/Checkout";
// import FirebaseAuth from "./screens/User/login/FirebaseAuth";

const showMenuHome = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate
          key={index}
          path={item.path}
          exact={item.exact}
          Component={item.component}
          scroll={item.scroll}
        ></HomeTemplate>
      );
    });
  }
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {showMenuHome(routerHome)}
        <Route path="/login" component={Login} />
        {/* <Route path="/firebase-auth" component={FirebaseAuth} /> */}
        <Route path="/sign-up" component={SignUp} />
        <Route path="/checkout/:id" component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
