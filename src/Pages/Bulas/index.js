import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import api from "../../services/api";

export class ListBulas extends Component {
    state = {
        bulas: []
    }

    handleClick(id){
        console.log(id);
        this.props.history.push(`/bula/${id}`);
    }

     componentDidMount() {
        api.get("/bulas")
            .then(dados => this.setState({ bulas : dados.data }))
            .catch(e => console.log(e));
    }

     render() {
        const { bulas } = this.state;
        console.log(bulas);
        return (
            <div>
                <h2>Sibmed</h2>
                <ListGroup>
                    {
                        bulas.map( bula => (
                            <ListGroupItem key={bula.id} tag="button" onClick={() => this.handleClick(bula.id)} action>
                                <ListGroupItemHeading>
                                    {bula.nomeComercial}
                                </ListGroupItemHeading>
                                <ListGroupItemText>
                                    {bula.fabricante}
                                </ListGroupItemText>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        );
    }
}

export class BulaId extends Component{

    state = {
        id: null,
        bula : {
            contraIndicacao:"",
            id:"",
            evidencia: {
                id:null,
                categoria:"",
                principioAtivo:"" ,
                situacaoPaciente: [],
            },
            fabricante:"",
            indicacao:"",
            nomeComercial:"",
            principioAtivo:"",
            reacaoAdversa:"",
            usuario:{}
        }
    }

    componentDidMount() {
        const param = this.props.match.params;

        console.log(param.id);
        api.get(`/bulas/${param.id}`)
            .then(dados => this.setState({ bula : dados.data }))
            .catch(e => console.log(e));
    }

    render(){
        const bula = this.state.bula;
        console.log(this.state.bula);
        return(
            <div>
                <h3>{bula.nomeComercial}</h3>
                <h6>{bula.fabricante}</h6>

                <h3>{bula.principioAtivo}</h3>

                <h4>Indicação</h4>
                <h6>{bula.indicacao}</h6>

                <h4>Contra Indicacao</h4>
                <h6>{bula.contraIndicacao}</h6>

                <h4>Reacao Adversa</h4>
                <h6>{bula.reacaoAdversa}</h6>

                <h4>Nível de evidência</h4>
                <h6>Categoria: {bula.evidencia.categoria}</h6>

                { 
                    bula.evidencia.situacaoPaciente.map( item => (
                        <div key={item.id}>
                            <h6>Estado do paciente: {item.estado}</h6>
                            <h6>Estado do paciente: {item.periodo}</h6>
                        </div>
                    ))
                }
            </div>
            
        )
        
    }
}
