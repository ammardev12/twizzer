import React from 'react'
import { connect } from 'react-redux';

import { addPost } from '../../../actions/postActions.js';


 class AddPost extends React.Component {
   constructor(){
     super();

     this.state = {
       post: '',
       file: {}
     }

     this.onChange = this.onChange.bind(this)
     this.onSubmit = this.onSubmit.bind(this)
  
   }

   onChange = (e) => {

     if(e.target.files) {
      this.setState({[e.target.name]: e.target.files[0]})
     }
     else if(e.target.value) {
      this.setState({[e.target.name]: e.target.value})
     }
   }
   onSubmit =  e => {
      e.preventDefault();
    
      const form = new FormData();
      form.append('postBody', this.state.post);
      form.append('file', this.state.file);
      form.append('userId', this.props.user.id);
      
      this.props.addPost(form);
      this.setState({
        post: "",
        file: ""
      })
   }


  render() {
    return (
      <div className="add-post-wrapper">
      <form onSubmit={this.onSubmit}>
          <textarea   onChange={this.onChange} value={ this.state.post } id="txt"  name="post" placeholder="Whats happening"></textarea>
          <input className="button" type="file"    onChange={this.onChange}  name="file" id=""/>
          <p className="post-errors">
          
          </p>
          <button disabled={this.state.post === '' ? true : false}    className="button">Post</button>
      </form>
     </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.auth.loggedUser
})

export default connect(mapStatetoProps, { addPost })(AddPost);