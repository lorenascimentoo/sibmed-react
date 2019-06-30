import React from "react";
import {isAuthenticated} from './services/auth';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ListBulas, BulaId } from "./Pages/Bulas";
import SingIn from './Pages/SingIn';
import SingUp from './Pages/SignUp';
import Search from './Pages/Search';
import Envio from './Pages/Enviar'
import Painel from './Pages/Painel';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>

            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ListBulas} />
            <Route path="/login" component={SingIn} />
            <Route path="/cadastro" component={SingUp} />
            <Route path="/bula/:id" component={BulaId} />
            <Route path="/pesquisa" component={Search} />
            <PrivateRoute path="/painel" component={Painel} />
            <PrivateRoute path="/upload" component={Envio} />
            <Route path="*" component={() => <h1>Página não encontrada</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;