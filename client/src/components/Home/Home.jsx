import React, { Component } from 'react'
import Navbar from '../sections/Navbar'
import Posts from './Posts/Posts';


export default class Home extends Component {
    render() {
       
        
        return (
            <div> 
                <Navbar />
                <Posts />
            </div>
        )
    }
}
