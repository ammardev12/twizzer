import React, { Component } from 'react'
import CurrentUser from './User'
import Navbar from '../sections/Navbar';
import './profile.css'
import { authenticated } from '../../actions/authAction';
import { connect } from 'react-redux';


 class Profile extends Component {

  componentWillMount() {
    // this.props.authenticated()
  }
  render() {
   
    
    return (
      <div>
        <Navbar  />
        <CurrentUser  />
      </div>
    )
  }
}

const  mapStateToProps = state => ({
  // auth: state.auth.authenticated

})  
export default connect(mapStateToProps, null )(Profile);
