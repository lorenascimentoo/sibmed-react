import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";


//import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { Token } from "../../services/auth";

import { Form, Container} from "./styles";

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
        const response = await api.post("/login", { email, senha });
        localStorage.setItem(Token, response.data);
        this.props.history.push("/painel");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
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
          <Link to="/cadastro">Cadastre-se</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);