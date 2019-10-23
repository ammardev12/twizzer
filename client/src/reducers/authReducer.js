import {REGISTER, LOGIN, LOGOUT, FOLLOW, FETCH_USER, AUTHENTICATED } from '../actions/types'; 


const inialState = {
    authenticated: localStorage.getItem('token') ? true : false,
    loggedUser: {},
    loggedUserPosts: [],
    name: "",
    token: '',
    user: {},
    username: "",
    userPosts: [],
    register :{},
    login : {},
    follow: {},
    followers: "",
    loggedUserFollowers: "",
    following: false,
    followingPpl: "",
    UserfollowingPpl: "",
}

export default function(state = inialState, action ) {
    switch(action.type) {
        case LOGOUT:
            return {
                ...state,
                authenticated: action.payload,
                loggedUser: {},
                token: '',
                register: '',
                login: ''
            };
        case AUTHENTICATED:
        
            return {
                ...state,
                loggedUser: action.payload.user, 
                loggedUserPosts: action.loggedUserPosts,
                name: action.payload.user !== null ? action.payload.name : "",
                authenticated: action.payload.logged,
                loggedUserFollowers: action.payload.followers.length,
                followingPpl: action.payload.followingPpl
              
            };
        case REGISTER:
           return {
               ...state,
               register: action.payload,
                authenticated: action.payload.token ? true : false,
                loggedUser: action.payload.user ? action.payload.user : null,
                token: action.payload.token ? action.payload.token : null,
                name: action.payload.user ? action.payload.user.name : null
           }
           case LOGIN:
               return {
                   ...state,
                    login: action.payload,
                    authenticated: action.payload.token ? true : false,
                    loggedUser: action.payload.user ? action.payload.user : null,
                    name: action.payload.user ? action.payload.user.name : null
               };

            case FOLLOW:
            
                return {
                    ...state,
                    follow: action.payload,
                    following: action.payload.action === "followed" ? true : false,
                    followers: action.payload.action === "followed" ?  state.followers + 1  : state.followers - 1
                };

            case FETCH_USER:
                const followingCheck = action.following.filter(follow => {
                        return follow.followerId === action.currentLoggedUser;
                });
                return {
                    ...state,
                    user: action.payload,
                    username: action.payload.name,
                    userPosts: action.userPosts, 
                    followers: action.followers,
                    UserfollowingPpl: action.followingPpl.length,
                    following: followingCheck.length > 0 ? true : false 
                }
        default :
        return state;
    }
}