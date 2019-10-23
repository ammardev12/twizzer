import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../actions/authAction';

 class Login extends Component {
     constructor() {
         super();

         this.state = {
             email: '',
             password: ''
         }
     }

     onChange = e => {
         this.setState({[e.target.name]: e.target.value})
     }

     onSubmit = e => {
         e.preventDefault();
         console.log(this.state);
         
         this.props.login(this.state)
     }

    render() {
        return (
            <div className="login-wrapper">
                <form onSubmit={this.onSubmit}>
                <div className="errors-wrapper">
                        <p className="errors"> {this.props.error} </p>
                </div>
                    <input   type="email" onChange={this.onChange} value={this.state.email} name="email" placeholder="email"/>
                    <input  type="password" onChange={this.onChange} value={this.state.password} name="password" placeholder="password"/>
                    <button className="button" type="submit">login</button>
                </form>
                <div className="form-footer">
                    <p>You  dont have account ? </p>
                    <Link to="/register" >
                        <button className="button" > Register</button>
                    </Link>
                    
                </div>
              
            </div>
        )
    }
}

const  mapStateToProps = state => ({
    error: state.auth.login.error
 
  })

export default  connect(mapStateToProps, {login})(Login);