import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

//import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { Token } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    senha: "",
    error: "",
    response: null
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, senha } = this.state;
    if (!email || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        //api.post("/login", { email, senha })
          //.then(res => console.log("Console "+res.data))
          //.then(res => this.setState({ response : res.data}));
        //var string = JSON.stringify(this.state.response);
        const response = await api.post("/login", { email, senha });
        localStorage.setItem(Token, response.data);
        this.props.history.push("/upload");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);