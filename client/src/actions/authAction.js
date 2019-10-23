import {REGISTER, LOGIN,LOGOUT, FOLLOW, FETCH_USER , AUTHENTICATED} from '../actions/types'; 
import axios from 'axios';
import jwt_decode from 'jwt-decode'

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT,
        payload: false,
    })
}

export const authenticated =  () =>   dispatch => {

   
    
    const token =   localStorage.getItem('token');

    if(token) {
        const decoded = jwt_decode(token);

        axios.get(`/api/users/${decoded.id}`)
        .then(user => {
            dispatch({
                type: AUTHENTICATED,
               payload:  {
                    user: user.data.user,
                    name: user.data.user.name,
                   logged: true,
                   followers: user.data.user.followers,
                   followingPpl: user.data.user.following.length,
                   
               },
               loggedUserPosts: user.data.userPosts
           })
        })
    }
    else {
        dispatch({
            type: AUTHENTICATED,
            payload: {
                logged: false,
                user: null,
                followers: 0
            }
        })
    }
   
}

export const register = (userdata) => dispatch => {

         axios.post('/api/users/register', {
            name: userdata.name,
            username: userdata.username,
            email: userdata.email,
            password: userdata.password,
        }).then(res => {
            if(res.data.error) {
                dispatch({
                    type: REGISTER,
                    payload: res.data
                })
                
            } else if(res.data.token) {
                localStorage.setItem('token', res.data.token);
                dispatch({
                    type: REGISTER,
                    payload: res.data
                })
            }
        })
}


export const login = (userdata) => dispatch => {
    console.log("action called", userdata);
    
    axios.post('/api/users/login', {
       email: userdata.email,
       password: userdata.password,
   }).then(res => {
       if(res.data.error) {
           dispatch({
               type: LOGIN,
               payload: res.data
           })
           
       } else if(res.data.token) {
           localStorage.setItem('token', res.data.token);
           dispatch({
               type: LOGIN,
               payload: res.data
           })
       }
   })
}

export const follow = (userdata) => dispatch => {
 
    
    axios.post(`/api/users/follow/${userdata.followedId}`, {
        followerId: userdata.followerId,
        type: userdata.type
    }).then(res => {
        dispatch({
            type: FOLLOW,
            payload: res.data,
            action: res.data.action
        })
    }) 
}

export const fetchUser = userdata => dispatch => {

        const token =   localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const id = decoded.id;

    axios.get(`/api/users/${userdata.userId}`)
    .then(res => {
        dispatch({
            type: FETCH_USER,
            payload: res.data.user,
            followers: res.data.user.followers.length,
            following: res.data.user.followers,
            currentLoggedUser: id,
            followingPpl: res.data.user.following,
            userPosts: res.data.userPosts
        })
    }) 
}

