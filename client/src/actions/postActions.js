import { FETCH_POSTS, ADD_POST, ADD_COMMENT,LIKE } from '../actions/types';
import axios from 'axios';

export const  fetchPosts =  () =>   dispatch  => {
           
       axios.get('/api/posts')
       .then(posts => {
        dispatch({
            type: FETCH_POSTS,
            payload: posts.data 
        })
       })
}

export const  addPost =  (postData) =>   dispatch  => {
      
   
    

           axios.post('/api/posts', postData)
            .then(post => { 
                dispatch({
                    type: ADD_POST,
                    payload: post.data
                })
            })
    
           
}

export const addComment = (commentData) => dispatch => {
        
            axios.post('api/posts/comment', commentData)
            .then(res => {
                dispatch({
                    type: ADD_COMMENT,
                    comment: res.data
                })
            })
} 

export const like = (data) => dispatch => {
  
    
    axios.post(`/api/posts/like`, data)
    .then(res => {
        console.log(res.data);
        
        dispatch({
            type: LIKE,
            likedPost: res.data.successLike
        })
  

    })
}