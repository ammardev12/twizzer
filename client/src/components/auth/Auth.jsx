import React, { Component } from 'react'
import Login from './login'
import Register from './Register'


export default class Auth extends Component {
   
    state = {
        register: true,
        login: false
    }

    showLogin = () => {
     this.setState({
         register:false,
         login: true
     })
    }
    showRegister = () => {
        this.setState({
            register:true,
            login: false
        })
    }

    render() {

        

             return  this.state.register === true ?  <React.Fragment >
                                            <Register
                                            onChange={this.props.handleChange}
                                            onSubmit={this.props.handleRegisterSubmit}
                                            registrationError={this.props.registrationError}
                                            values={this.props.values}
                                            showLogin={this.showLogin}
                                            />
                                                </React.Fragment> :  <Login
                                                onChange={this.props.handleChange}
                                                onSubmit={this.props.handleloginSubmit}
                                                values={this.props.values}
                                                showRegister={this.showRegister}
                                                loginError={this.props.loginError}
                                                />  }
     
            
    }

