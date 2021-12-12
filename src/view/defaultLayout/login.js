import React from 'react';
import './login.css';
import { Route } from "react-router-dom";


class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            passCode : '@#$boom420420',
            inputPassCode : '',
            errorMessage : ''
        }
    }

  render() {
    return (
      <div>
        <div class="body"></div>
        <div class="grad text-dark">
            
        </div>
        <div class="header">
          <div>
            Login<span></span>
          </div>
        </div>

        <div class="login">
          {/* <input type="text" placeholder="username" name="user"/> */}
          <input
            type="password"
            placeholder="enter passcode"
            name="password"
            onChange={(e) => {
              this.setState({
                inputPassCode: e.target.value,
              });
            }}
          />

          <Route
            render={({ history }) => (
                <input
            type="button"
            value="Login"
            onClick={() => {
              if (this.state.inputPassCode == this.state.passCode) {
                window.localStorage.setItem("isAllowed",true);
                console.log("login Successfully");
                history.push('/admin')
              } else {
                console.log("failed")
                this.setState({
                    errorMessage : "plz enter correct password  !!" 
                })
                window.localStorage.setItem("isAllowed",false);
              }
            }}
          />  
            )}
          />

          <div className="bg-dark">
              <spna class="text-danger">{this.state.errorMessage}</spna>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;