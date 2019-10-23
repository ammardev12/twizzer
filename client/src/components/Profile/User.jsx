import React, { Component } from 'react'
import LoggedUserImage from '../sections/LoggedUserImage'
import SingleUserPost  from './SingleUserPost'
import FollowBtn from '../sections/FollowBtn';
import './profile.css';

import { authenticated } from '../../actions/authAction';

import { connect } from 'react-redux';

 class CurrentUser extends Component {
     
     componentWillMount() {
        //  this.props.authenticated()
     }
    render() {
       
         
        return (
           <div className="user-wrapper">
                <div className="user-info-wrapper">
                    <div className="user-info-header">
                       <LoggedUserImage username={ this.props.loggedUser.name } className="profile-image" />
                    </div>
                    <div className="user-info-data">
                        <div className="user-data">
                            <span className="name"> { this.props.loggedUser.name } </span>
                            <small className="username">@ { this.props.loggedUser.username}</small>
                        </div>
                        <div className="user-others">
                            <span className="bio"></span>
                            <div className="follow">
                                <div className="followers"> <small>{ this.props.loggedUserFollowers }</small> <span>followers</span></div>
                                <div className="following"> <small>{ this.props.followingPpl }</small> <span>following</span></div>
                            </div>
                        </div>
                    </div> 
                </div>

                <div className="user-posts">
                  {
                     this.props.loggedUserPosts.map(post => {
                          return (
                          <SingleUserPost key={post.id} post={post}  user={this.props.loggedUser} />
                          )
                      })
                  }
                </div>
           </div>
        )
    }
}
const mapStateToprops = state => ({
    loggedUser: state.auth.loggedUser,
    loggedUserPosts: state.auth.loggedUserPosts,
    loggedUserFollowers: state.auth.loggedUserFollowers,
    followingPpl: state.auth.followingPpl
})
export default connect(mapStateToprops ,  null)(CurrentUser)