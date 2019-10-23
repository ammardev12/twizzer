import { FETCH_POSTS, ADD_POST, ADD_COMMENT, LIKE } from '../actions/types';


const inialState = {
    posts: [],
    post: {},
    comment: {},
    like: {}
}

export default function(state = inialState, action ) {
    switch (action.type) {
       case FETCH_POSTS: 
            return {
                ...state,
                posts: action.payload 
            };
        case ADD_POST:
            return {
                ...state,
                post: action.payload 
            };
        case ADD_COMMENT:
            return {
                ...state,
                comment: action.comment
            };
        case LIKE: 
        return {
            ...state,
            like: action.likedPost
        }
            
        default:
           return state;
    }
}