import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/postActions';



function AddComments(props) {

    const [ comment, setComment ] = useState("");

    const handleOnChange = (e) => {
        setComment(e.target.value)
        
    }

    const handleOnSubmit = (e) => {
            e.preventDefault();
            // console.log(comment);
           props.addComment({
               userId: props.userId,
               username: props.username,
               postId: props.postId,
                comment
            });

           setComment("")

    }

    return (
        <div className="add-comment-wrapper">
            <form onSubmit={ handleOnSubmit }>
                <textarea onChange={ (value) =>  handleOnChange(value)} value={ comment } placeholder="add your comment"> </textarea>
                 <button className="button comment-btn" type="submit" > Comment</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.auth.loggedUser.id,
    username: state.auth.loggedUser.name
})

export default connect(mapStateToProps, { addComment })(AddComments);
