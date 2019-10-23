import React, { Component } from 'react';
import './userImage.css';
import { connect } from 'react-redux';
import { authenticated } from '../../actions/authAction';



 class LoggedUserImege extends Component {

  componentWillMount() {
    this.props.authenticated()
  }

  render() {
    const letter = this.props.name.slice(0,2).toUpperCase();
    return (
      <div className="image-wrapper"> 
      <div className="user-image">
          <span>{ letter }</span>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  name: state.auth.name
})

export default connect(mapStateToProps,  { authenticated })(LoggedUserImege);