import logo from "./logo.svg";
import "./style.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React, { Component, Suspense } from "react";
import routes from "./routes";
import Header from "./view/defaultLayout/header";

function App() {
  const loading = () => {
    return <div> Loading ...</div>;
  };
  return (
    <div className="h-100">
      <div className="app-container h-100">
        <Router>
          <Header />
          <div className="app-body-css">
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
