import React, { Component } from 'react'
import { connect } from 'react-redux';

import { fetchPosts } from '../../../actions/postActions.js';

import SinglePost from './SinglePost';
import AddPost from './AddPost'; 
import './posts.css'



 class Posts extends Component {
    
  UNSAFE_componentWillMount() {
    this.props.fetchPosts();

    

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost){
      // console.log(nextProps.newPost);
      
      this.props.posts.unshift(nextProps.newPost)
    }
  }

  render() {
  
  return (

    <div className="posts-wrapper"> 
       <AddPost />
       <div className="post-wrapper">
          {
            this.props.posts.map(post => {
              return  (
                   <SinglePost key={post.id} post={post}  />
                ) 
            })
          }
       </div>
    </div>
  )
  

  }
}
 
const  mapStateToProps = state => ({
  posts: state.posts.posts,
  newPost: state.posts.post.post
}) 

export default connect(mapStateToProps, { fetchPosts })(Posts);
