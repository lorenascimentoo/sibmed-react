import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


//  const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>

//     //   isAuthenticated() ? (
//     //     <Component {...props} />
//     //   ) : (
//     //     <Redirect to={{ pathname: "/painel", state: { from: props.location } }} />
//     //   )
//     }
//   />
// );

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <h1>Tela inicial do sistema</h1>} />
            <Route path="/login" component={() => <h1>Tela de login</h1>} />
            <Route path="/cadastro" component={() => <h1>Cadastro de usuário</h1>} />
            <Route path="/bulas" component={() => <h1>Listas de Bulas</h1>} />
            <Route path="/bula" component={() => <h1>Bula com id</h1>} />
            <Route path="/pesquisa" component={() => <h1>Pesquisa com Lucene</h1>} />
            {/* <PrivateRoute path="/painel" component={() => <h1>Painel de gestão de bulas</h1>} />
      <PrivateRoute path="/upload" component={() => <h1>Inserindo de bulas</h1>} /> */}
            <Route path="*" component={() => <h1>Página não encontrada</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;