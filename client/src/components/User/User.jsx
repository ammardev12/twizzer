import React, { Component } from 'react';
import Navbar from '../sections/Navbar';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/authAction';
import UserImage from '../sections/UserImege';
import FollowBtn from '../sections/FollowBtn';
import UserPost from './UserPost';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:  false
        }
    }
    componentWillReceiveProps(nextProps) {
  
        
    }

    componentWillMount( ){
        this.props.fetchUser({
            userId: this.props.match.params.id
        })

        if( this.props.user.id === 34) {
            this.setState({
                hide: true
            })
        }
   
    }
 
    render() {
        
        
       return (
        <div>
        <Navbar />
        <div className="user-wrapper">
         <div className="user-info-wrapper">
             <div className="user-info-header">
                <UserImage username={ this.props.user.name } className="profile-image" />
             </div>
             <div className="user-info-data">
                 <div className="user-data">
                     <span className="name">{this.props.user.name}</span>
                     <small className="name">@{ this.props.user.username }</small>
                 </div>
                 <div className="user-others">
                     <span className="bio"></span>
                     <div className="follow"> 
                        {
                            
                            parseInt(this.props.match.params.id, 10) === this.props.id ? '' :    <FollowBtn userId={ this.props.user.id } />
                        }
                       
                         <div className="followers"> <small> { this.props.followers } </small> <span>followers</span></div>
                         <div className="following"> <small> {  this.props.followingPpl }</small> <span>following</span></div>
                     </div>
                 </div>
             </div> 
         </div>

         <div className="user-posts">
                {
                    this.props.userPosts.map(post => {
                        return (
                            <UserPost loggedUser={this.props.loggedUser } key={ post.id } post={post} user={this.props.user} />
                        )
                    })
                }
         </div>
        </div>
     </div>
       ) 
       
    }
}
const mapStateToProps = state => ({
    user: state.auth.user,
    loggedUser:state.auth.loggedUser,
    id: state.auth.loggedUser.id,
    followers: state.auth.followers,
    following: state.auth.following,
    followingPpl: state.auth.UserfollowingPpl,
    userPosts: state.auth.userPosts,
})
export default connect(mapStateToProps, { fetchUser })(User);