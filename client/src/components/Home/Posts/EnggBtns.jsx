import React, { Component } from 'react';
import { connect } from 'react-redux';
import { like } from '../../../actions/postActions';

 class EnggBtns extends Component {
    constructor(props){
        super(props);
        this.state = {
            commentsNumber: props.commentsNumber || [],
            likes: props.likes || []
        }
    }

    componentWillMount(){
   
    }

    componentWillReceiveProps(newProps) {

        //not alowing it to increment the number of comments twice
        const comments = this.state.commentsNumber;
        const filterComments = comments.filter(comment => (
            comment.id === newProps.newcomment.id
        ));
            
        if(newProps.newcomment && filterComments.length === 0) {
            if(newProps.newcomment.postId === this.props.postId) {
                this.props.commentsNumber.push(newProps.newcomment)
            }
        }

        const likes = this.state.likes;
        const filterLikes = likes.filter( like => (
            like.id === newProps.newLike.id
        ))

        if(newProps.newLike && filterLikes.length === 0) {
            if(newProps.newLike.postId === this.props.postId) {
                this.props.likes.push(newProps.newLike)
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.like({
            userId: this.props.userId,
            postId: this.props.postId
        })

    }

    render() {
        return (
            <div className="engg-wrapper">
                <button className="engg-btns">
                     <img className="engg-btns-svg" src="./images/btns/share-alt.svg" alt=""/>
                </button>
                <button onClick={ () => this.props.commentToggler() } className="engg-btns">
                     <img className="engg-btns-svg" src="./images/btns/comment-dots.svg" alt=""/>
                     <span style={{ color: "crimson" }}> {this.props.commentsNumber ? this.props.commentsNumber.length : 0 } </span>
                </button>
                <form onSubmit={ this.onSubmit }>
                    <button type="submit"  className="engg-btns">
                        <img className="engg-btns-svg" src="./images/btns/heart.svg" alt=""/>
                        <span style={{ color: "crimson" }}> { this.props.likes  ? this.props.likes.length : 0 } </span>
                    </button>
                </form>
                 
                
               
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    newcomment: state.posts.comment,
    newLike: state.posts.like
})

export default connect(mapStateToProps, { like })(EnggBtns);