import React, { Component } from 'react'
import { connect } from 'react-redux';
import { follow } from '../../actions/authAction';

 class FollowBtn extends Component {
    constructor() {
        super()
            
            this.state ={
                follow: false,

            }
    }
    onClick = () => {
        this.setState({
           follow: !this.state.follow
        })

        console.log(this.props.userId, this.props.loggedUser.id, this.state.follow);
        
    }

    componentWillReceiveProps(nextProps) {
     
            if(nextProps.following === true) {
                this.setState({ follow: true})
            } else if(nextProps.following === false) {
                    this.setState({ follow: false})
            }
    }

    componentWillMount() {
        this.setState({
            follow: this.props.following
        })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.follow({
            followerId: this.props.loggedUser.id,
            followedId: this.props.userId,
            type: this.state.follow === true ? "follow" : 'unfollow'
        })

    }
    render() {
        const getStyle = {
            background: this.state.follow === true ?'#00bcd4' : '#fff'  ,
            color: this.state.follow === true ? '#fff' :  '#00bcd4' 
        }
        return (
            <div> 
                <form onSubmit={this.onSubmit}>
                    <button 
                        type="submit"
                        onClick={this.onClick} 
                        style={getStyle} 
                        className="button">{ this.state.follow === true ? 'following' : ' follow ' }
                    </button>
                </form>
                 
            </div>
        )
    } 
}

const mapStateToProps = state => ({
    loggedUser: state.auth.loggedUser,
    followers: state.auth.follow,
    following: state.auth.following
})

export default connect(mapStateToProps, { follow })(FollowBtn)