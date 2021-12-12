import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText} from 'reactstrap';
import './header.css';
import { Route } from "react-router-dom";



class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isAdminPage : false,
    }
  }

  componentDidMount(){
    let url = window.location;
    console.log("31")
    console.log(url)
    if(url.pathname === "/admin"){
      this.setState({
        isAdminPage : true
      })
    } else{
      this.setState({
        isAdminPage : false
      })
    }
  }


  header = () => {
    return (
      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <h4 className="text-white">Collapsed content</h4>
            <span className="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex justify-content-center">
            <span className="text-white">QUIXXX</span>
          </div>
        </nav>
      </div>
    );
  };

  toggle(){
    this.setState({
      isOpen : !this.state.isOpen
    })

  }

  header1 = () => {
    return (
      <div>
      <Navbar color="light" light expand="md">
         <NavbarBrand href="/">
         <a className="nav-link active" href="#">
              QUIXXO
            </a>
         </NavbarBrand>
        <NavbarToggler onClick={()=>this.toggle()} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/"><a className="nav-link" href="#">
              <i className="fas fa-glass-cheers px-2"></i>
              Party
            </a></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
              <a className="nav-link" href="#">
              <i className="fa fa-comments px-2" aria-hidden="true"></i>
              Conversation Starter
            </a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
              <a className="nav-link" href="#">
              <i className="fas fa-grin-tongue-squint px-2"></i>
              Quizzes
            </a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
              <a className="nav-link" href="#">
              <i className="fas fa-quote-left px-2"></i>
              Quotes
            </a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
              <a className="nav-link" href="#">
              <i className="fa fa-gamepad px-2" aria-hidden="true"></i>Games
            </a>
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <NavbarText>    <NavItem>
              <Route render={({history})=>(
                <NavLink  onClick={
                  ()=>{
                    if(this.state.isAdminPage){
                      history.push({
                        pathname : '/'
                      })
                    } else {
                      
                      history.push({
                        pathname : '/admin'
                      })
                    }
                  }
                }>
                <a className="nav-link" href="#">
                {/* <i className="fa fa-gamepad px-2" aria-hidden="true"></i>{this.state.isAdminPage ? "to playground" : "to admin"} */}
              </a>
                </NavLink>
              )}
              />
            </NavItem></NavbarText>
        </Collapse>
        </Navbar>

        {/* <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              QUIXXO
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-glass-cheers px-2"></i>
              Party
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa fa-comments px-2" aria-hidden="true"></i>
              Conversation Starter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-grin-tongue-squint px-2"></i>
              Quizzes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-quote-left px-2"></i>
              Quotes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa fa-gamepad px-2" aria-hidden="true"></i>Games
            </a>
          </li>
        </ul> */}
      </div>
    );
  };

  render() {
    return (
      <div className="">{this.header1()}</div>

      // <div>
      //     <nav className="navbar navbar-expand-lg navbar-light">
      //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      //             <span className="navbar-toggler-icon"></span>
      //         </button>
      //         <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      //             {/* <a className="navbar-brand logo_css" href="#">Qixxoo</a> */}
      //             <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      //                 <li className="nav-item active">
      //                     <img className="logo_img_css" src={Logo}/>
      //                 </li>
      //                 <li className="nav-item active">
      //                     <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      //                 </li>
      //                 <li className="nav-item">
      //                     <a className="nav-link" href="#">Link</a>
      //                 </li>
      //             </ul>
      //             <form className="form-inline my-2 my-lg-0">
      //                 <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      //                 <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      //             </form>
      //         </div>
      //     </nav>
      // </div>
    );
  }
}

export default Header;