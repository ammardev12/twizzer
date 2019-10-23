import React, { Component} from 'react'
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';
import  User from './User/User';


import { connect } from 'react-redux';
import Register from './auth/Register';
import Login from './auth/login';
import Home from './Home/Home';
import Profile from './Profile/Profile';


import './main.css'
import {authenticated} from '../actions/authAction';


 class Main extends Component {
    // constructor() {
    //     super();

      

    //     this.state = {
    //         id: '',
    //         name: '',
    //         username: '',
    //         email: '',
    //         userImage: '',
    //         password: '',
    //         registerError: '',
    //         loginError: '',
    //         logged: localStorage.getItem('token') || false,
    //         token: localStorage.getItem('token') ,
    //         posts: [],
    //         newPostTrigger: false,
    //         newPost: {},
    //         newPostError: '',
    //         postBody: '',
    //         postImage: {},
    //         profile: false,
    //        user: {},
    // }

    //     this.handleChange = this.handleChange.bind(this)
    //     this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    //     const token = localStorage.getItem('token')
    //     if(token) {
    //         this.setState({user:{logged: true}})
    //     }
        
    // }
    
 
    // //inputs change
    // handleChange = input => e => {
    //     e.preventDefault()
    //     this.setState({[input]: e.target.value})
    // }

    // //Login handlers
    // handleloginSubmit = e  => {
    //     e.preventDefault()
    //     axios.post('/api/users/login', {
    //         email: this.state.email,
    //         password: this.state.password
    //     }).then(res => {
    //         if(res.data.error) {
    //             this.setState({loginError: res.data.error})
    //         }
    //         else if(res.data.token) {
    //             localStorage.setItem('token', res.data.token)
    //             this.setState({logged: res.data.token,id: res.data.user.id, user: res.data.user, name:res.data.user.name})
    //         }
        
            
    //     })
         
    // }

    // //Register Handlers
    // handleRegisterSubmit = e => { 
    //     e.preventDefault();
    //     axios.post('/api/users/register', {
    //         name: this.state.name,
    //         username: this.state.username,
    //         email: this.state.email,
    //         password: this.state.password,
    //     }).then(res => {
    //         if(res.data.error) {
    //             this.setState({registerError:res.data.error})
    //             console.log(this.state.registerError);
                
    //         } else if(res.data.token) {
    //             localStorage.setItem('token', res.data.token)
    //             this.setState({logged: res.data.token})
    //             this.setState({id: res.data.user.id})
    //             this.setState({user: res.data.user})
    //         }
            

         
            
    //     })
        
    // }

    // //handling Logout
    // logout = () => {
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('logged')
    //     this.setState({logged:false, id: '', name: '', email: '', password: '', token: '', user: ''})
       
    // }

    // //fetching Posts
    // UNSAFE_componentWillMount = async () => {

    //     if(this.state.logged) {
    //         const token = localStorage.getItem('token')
    //         const decoded = jwt_decode(token)
    //         this.setState({
    //             id: decoded.id,
    //             name: decoded.name,
    //             email: decoded.email,
       
    //         })
    //     }
       
    //     // //fetch all posts
    //     // const posts = await  axios.get('/api/posts')
    //     // // console.log(posts.data.posts);
    //     // this.setState({posts: posts.data.posts})
     
    //    //get the user with posts
    //    const user = await axios.get(`/api/users/${this.state.id}`)
      
    //    this.setState({user: user.data})
        

    // }

    

    // //add posts

    // handlePostChange = input => e => {
    //     if(e.target.files) {
    //         this.setState({[input]: e.target.files[0]})
           
    //     } else if(input === 'postBody') {
    //         this.setState({postBody: e.target.value})
    //     }

        
    // }
    // handlePostSubmit = async (e) => {
    //     e.preventDefault();
        
       
        
    //     const formData = new FormData();
    //     formData.append('file', this.state.postImage)
    //     formData.append('postBody', this.state.postBody)
    //     formData.append('userId', this.state.id)

    //     const res = await axios.post('/api/posts', formData, {
    //         headers: {
    //             "token": this.state.logged
    //         }
    //     })
    //     if(res.data.error) {
    //         console.log(res.data.error);
    //         this.setState({newPostError: res.data.error})
    //     } else {
    //         // console.log(res.data.post);
    //         this.setState({newPost: res.data.post})
    //         this.setState({newPostTrigger: !this.state.newPostTrigger})
          
          
    //     }
       
         
        
        
    // }

    componentWillMount() {
        this.props.authenticated();
     
        // console.log(this.props.auth.authenticated);
    }
   
   
   
    render() {
        return (
            <Router >
                <Switch >
            
                
                   <PublicRoutes authed={this.props.auth} path='/register' exact component={Register} />
                   <PublicRoutes authed={this.props.auth} path='/login' exact component={Login} />

                   <PrivateRoutes  authed={this.props.auth} path='/profile' exact component={Profile} />
                   <PrivateRoutes  authed={this.props.auth} path="/:id"  component={User} />
                   <PrivateRoutes authed={this.props.auth} path='/' exact component={Home} />
           

                
               
                   
                </Switch>
            </Router>
        )
    }
}



const  mapStateToProps = state => ({
    auth: state.auth.authenticated
 
  })  
export default connect(mapStateToProps, {authenticated})(Main);