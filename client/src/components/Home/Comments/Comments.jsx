import React, { Component } from 'react'
import AddComment from './AddComments'
import SingleComment from './SingleComment';
import './comment.css'
import { connect } from 'react-redux';

 class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments || []
        }
    }

    componentWillReceiveProps({ newComment }) {
            const filtered = this.state.comments.filter( coment => {
                return coment.id === newComment.id
            });
        
          if(filtered.length === 0 && newComment.postId === this.props.postId)  {
                this.state.comments.push(newComment)
            }
      
    }

    render() {
        return (
            <div>
                {
                  this.state.comments.map( comment => {
                        return comment === ""  ?  "" :   <SingleComment key={ comment.id } comment={ comment } numbers ={ this.state.comments.length } /> 
                    })
                }
              
                <AddComment postId={ this.props.postId } />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    newComment: state.posts.comment
})
export default connect(mapStateToProps, null )( Comments)