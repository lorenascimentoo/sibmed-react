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
        id: this.props.match.params
    }

    render(){
        
        const {id} = this.state.id;
        console.log(id);

        return(
            <div>
                <h3>Olá, página da Lista com id!</h3>
            </div>
        )
        
    }
}
