import React, { Component } from "react";
import GlobalStyle from '../../styles';
import { Container, Content } from './styles';
import SearchList from '../../components/SearchList';
import Header from '../../components/Header';


import api from "../../services/api";

export class ListBulas extends Component {
    state = {
        bulas: []
    }

    handleClick  = id => this.props.history.push(`/bula/${id}`);

    componentDidMount() {
        api.get("/bulas")
            .then(dados => this.setState({ bulas: dados.data }))
            .catch(e => console.log(e));
    }

    render() {
        const { bulas } = this.state;
        console.log(bulas);
        return (
            <Container>
                
                <Content>
                <Header />
                    <SearchList bulas={bulas} handleClick={this.handleClick}/>
                </Content>
                <GlobalStyle />
            </Container>
        );
    }
}

export class BulaId extends Component {

    state = {
        id: null,
        bula: {
            contraIndicacao: "",
            id: "",
            evidencia: {
                id: null,
                categoria: "",
                principioAtivo: "",
                situacaoPaciente: [],
            },
            fabricante: "",
            indicacao: "",
            nomeComercial: "",
            principioAtivo: "",
            reacaoAdversa: "",
            usuario: {}
        }
    }

    componentDidMount() {
        const param = this.props.match.params;

        console.log(param.id);
        api.get(`/bulas/${param.id}`)
            .then(dados => this.setState({ bula: dados.data }))
            .catch(e => console.log(e));
    }

    render() {
        const bula = this.state.bula;
        console.log(this.state.bula);
        return (
            <Container>
                
                <Content>
                <h4>{bula.nomeComercial}</h4>
                <h5>{bula.principioAtivo}</h5>

                <h6>{bula.fabricante}</h6>

                

                <h6>{bula.indicacao}</h6>

                <h6>{bula.contraIndicacao}</h6>
                
                <h6>{bula.reacaoAdversa}</h6>

                <h5>Nível de evidência</h5>
                <h6>Categoria: {bula.evidencia.categoria}</h6>

                {
                    bula.evidencia.situacaoPaciente.map(item => (
                        <div key={item.id}>
                            <h6>Estado do paciente: {item.estado} | Indicação: {item.periodo} </h6>
                        </div>
                    ))
                }
                </Content>
                <GlobalStyle />
            </Container>
        )

    }
}
