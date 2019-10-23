import React, { Component } from 'react';
import CommentUserImage from './CommentUserImage';
import './comment.css';

import { Link } from 'react-router-dom';

export default class SingleComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: props.comment,
            commentsNumber: props.numbers
        }
    }
    render() {
        return (
            <div className="single-comment-wrapper">       
                <div className="comment-header">
                <CommentUserImage name={ this.state.comment.username } />  
                    <Link to={ `/${ this.state.comment.userId }`} >
                        <span> { this.state.comment.username } </span>
                    </Link>
                    {/* <p>@ammar12c</p> */}
                </div>     
                <div className="comment-body"> 
                    <p>


                      {
                          this.state.comment.comment 
                      }
                    </p>
                </div>
            </div>
        )
    }
}
