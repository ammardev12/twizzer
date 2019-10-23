import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoggedUserImage from '../sections/LoggedUserImage';
import './navbar.css'
import { connect } from 'react-redux';
import { logout, authenticated } from '../../actions/authAction';

 class Navbar extends Component {

  componentWillMount() {
    this.props.authenticated()
  }

  logoutSubmit = () => {
    this.props.logout();
 
    
  }
  render() {
    return (
      <header>
      <Link to='/'> 
       <button className="logo">
          Twizzer
       </button>
      </Link>
      <ul>
          <li> 
            <Link to='/profile'> 
              <button >
                <LoggedUserImage name={this.props.loggedUser.name} />
              </button> 
            </Link>
            
          </li>
          <li><button className="button" onClick={this.logoutSubmit}>Logout</button></li>
      </ul>
    </header> 
    )
  }
}

const mapStateToProps = state => ({
  loggedUser: state.auth.loggedUser
})
export default connect(mapStateToProps, {logout, authenticated})(Navbar);