import React, {Component, useState } from 'react'
import EnggBtns from './EnggBtns'
import PostUserImage from './PostUserImege';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticated } from '../../../actions/authAction'
import Comments from '../Comments/Comments';


 class SinglePost extends Component {
   constructor(props){
     super(props);

      this.state = {
        toggle: true
      }
   }

  commentToggler = () => {
      this.setState({
        toggle: !this.state.toggle
      })
  }

  loveToggler = () => {
    console.log("love");
    
  }

  render() {
    return (
      <div>
      <div className="single-post-wrapper">
      <div className="post-header">
            <div className="user-header">
                <PostUserImage name={this.props.post.user.name} />
                <Link to={`/${this.props.post.user.id}`} >
                    <span> {this.props.post.user.name} </span>
                </Link>
         
                <small className="user-handle"> @{this.props.post.user.username}  </small>
            </div>
       
      </div>
      <div className="post-body">

           <p>
              {this.props.post.postBody}
           </p>
          
          {
            <img src={`./uploads/posts/${this.props.post.postImage}`} alt=""/>
          }
           
      </div>
     
      <div className="post-footer">
          <EnggBtns 
            postId={ this.props.post.id } 
            userId={ this.props.loggedUser.id }
            commentsNumber={ this.props.post.comments ? this.props.post.comments : [] }
            commentToggler={ this.commentToggler }
            loveToggler={ this.loveToggler }
            likes={ this.props.post.likes ?  this.props.post.likes : [] } />
      </div>
      <div style={ this.state.toggle === false ? { display: "none" } : { display: "unset" } } className="comment-wrapper">
        <Comments  postId={ this.props.post.id } comments={ this.props.post.comments } />
      </div>
      </div>
     
     </div>
    )
  }
}




const mapStateToProps = state => ({
  loggedUser: state.auth.loggedUser
})
export default connect(mapStateToProps, null )(SinglePost)