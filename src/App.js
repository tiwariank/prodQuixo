import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link ,
  Redirect
} from "react-router-dom";
import React, { Component, Suspense } from 'react';
import routes from './routes';


function App() {

  const loading = ()=>{
    return <div> Loading ...</div>
  }
  return (
    <div className="">
      <Router>
        <div>
          <Suspense 
          fallback={loading()}
          >
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
  );
}

export default App;
