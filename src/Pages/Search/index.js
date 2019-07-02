import React, { Component } from "react";
import SearchList from '../../components/SearchList';
import api from '../../services/api';
import { Form, Container } from "./styles";


export class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bulas: [],
            indicacao: '',
            contraIndicacao: '',
            reacaoAdversa: '',
            principioAtivo: '',
            error :''
        }
    }
    
    handleClick = id => this.props.history.push(`/bula/${id}`);

    handlePage(){
        this.props.history.push(`/`);
    }

    handleSearch = async e => {
        e.preventDefault();

        console.log("" + this.state.indicacao + ", " + this.state.contraIndicacao + ", " + this.state.reacaoAdversa + ", " + this.state.principioAtivo);
        if (this.state.indicacao !== '') {
            await api.get(`/bulas/busca?indicacao=${this.state.indicacao}`)
                .then(res => this.setState({ bulas: res.data }))
                .catch(e => {
                    this.setState({
                        error: "Não foi possível encontrar nenhuma bula com sua pesquisa :( "
                    })
                    
                })
            
        } else if (this.state.contraIndicacao !== '') {
            await api.get(`/bulas/busca?contraIndicacao=${this.state.contraIndicacao}`)
                .then(res => this.setState({ bulas: res.data }))
                .catch(e => {
                    this.setState({
                        error: "Não foi possível encontrar nenhuma bula com sua pesquisa :( "
                    })
                    
                })
            
        }else if (this.state.reacaoAdversa !== '') {
            await api.get(`/bulas/busca?reacaoAdversa=${this.state.reacaoAdversa}`)
                .then(res => this.setState({ bulas: res.data }))
                .catch(e => {
                    this.setState({
                        error: "Não foi possível encontrar nenhuma bula com sua pesquisa :( "
                    })
                    
                })  
        } 
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSearch}>
                    {this.state.error && <p>{this.state.error}</p>}
                    
                    <input
                        placeholder="Indicação"
                        onChange={e => this.setState({ indicacao: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Contraindicação"
                        onChange={e => this.setState({ contraIndicacao: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Reação Adversa"
                        onChange={e => this.setState({ reacaoAdversa: e.target.value })}
                    />
                    <button type="submit">Buscar</button>
                    <hr />

                    <button onClick={() => this.handlePage()}>Voltar</button>
                </Form>
                <SearchList bulas={this.state.bulas} handleClick={this.handleClick} />
            </Container >

        )
    }
}

export default Search;
