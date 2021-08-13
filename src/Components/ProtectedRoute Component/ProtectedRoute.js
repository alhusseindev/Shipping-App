import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/** This will take the following parameters as props:
 *
 * @param authenticated: true || false
 * @param Component: component to be rendered
 * @param ...rest
 */


/***
 const ProtectedRoute = ({authenticated, component: Component, ...rest}) =>{
    return(
        <Route {...rest} render={(props) =>{
            //if auth === true
            if(authenticated){
                return(<Component {...props} />);
            }

            if(!authenticated){
                return(<Redirect to={{path: "/", state:{from: props.location}}} />);
            }
        }} />
    );
};
 */
const ProtectedRoute = ({authenticated, component: Component, ...rest}) =>{
    return(
        <Route {...rest} render={(props) =>{
            //if auth === true
            if(authenticated){
                //adding {...rest} fixed the problem
                return(<Component {...rest} {...props} />);
            }

            if(!authenticated){
                return(<Redirect to={{path: "/", state:{from: props.location}}} />);
            }
        }} />
    );
};

export default ProtectedRoute;

