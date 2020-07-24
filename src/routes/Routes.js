import { Switch, Route, Redirect } from "react-router"
import Home from "../components/Home/Home"
import Login from "../components/Login/Login"
import Vehicles from "../components/Vehicles/Vehicles"
import Dashboard from "../components/Dashboard/Dashboard"


import React from 'react'
import Crud from '../components/Vehicles/Crud'

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.isAuth ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}


export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/veiculos' component={Vehicles} />
            <PrivateRoute path='/veiculos/add' component={Crud} />
            <PrivateRoute path='/veiculos/:id' component={Crud} />
        </Switch>
    )
}