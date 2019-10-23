import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { register } from '../../actions/authAction';

 class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            username: '',
            password: ''
        }
    }

    onChange = e => {
            this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register({
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })

    }
    componentWillReceiveProps(nextProps) {
    
     
        
      
      }

    render() {
        return (
            <div className="login-wrapper">
                <form  onSubmit={this.onSubmit}>
                <div className="errors-wrapper">
                        <p className="errors">{ this.props.error } </p>
                </div>
                    <input onChange={this.onChange} value={this.state.name}  type="text" name="name" placeholder="name"/>
                    <input  onChange={this.onChange}  value={this.state.username} type="text" name="username" placeholder="username"/>
                    <input  onChange={this.onChange}  value={this.state.email}  type="email" name="email" placeholder="email"/>
                    <input onChange={this.onChange}   value={this.state.password} type="password" name="password" placeholder="password"/>
                    <button className="button"  type="submit">Register</button> 
                </form>
                <div className="form-footer">
                    <p>You have account ? </p>
                    <Link to="/login" >
                         <button className="button"> Login</button>
                    </Link>
                 
                </div>
               
            </div>
        )
    }
}

 
const  mapStateToProps = state => ({
    error: state.auth.register.error
 
  })

export default  connect(mapStateToProps, {register})(Register);
