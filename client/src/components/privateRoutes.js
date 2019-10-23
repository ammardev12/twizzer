import React from 'react';
import { Route, Redirect } from 'react-router-dom';



 const  privateRoutes = ({component: Component, authed, ...rest}) => {
    return (
        <Route {...rest} 
        render={ (props) => authed === true 
        ? <Component {...rest} {...props} >  {props.children} </Component>
        : <Redirect to={
            {
                pathname: '/login',
                state: {
                    from: props.location
                }
            }
         } /> 
        } />
    )
};

export default privateRoutes;