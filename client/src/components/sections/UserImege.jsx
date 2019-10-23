import React, { Component } from 'react';
import './userImage.css';
import { connect } from 'react-redux';
import { authenticated } from '../../actions/authAction';



 class UserImege extends Component {
      constructor(props) {
        super(props);
          this.state = {
            name: props.name
          }
      }
  componentWillMount() {
    this.props.authenticated();
  }


  render() {
  
    const letter = this.state.name.slice(0,2).toUpperCase();
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
  name: state.auth.username
})

export default connect(mapStateToProps,  { authenticated })(UserImege);