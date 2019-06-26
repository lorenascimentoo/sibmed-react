import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import Header from '../../components/Header';

import api from "../../services/api";

export class ListBulas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bulas: []
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(id) {
        console.log('Clicado');
        console.log(id);
    }

    componentWillMount() {
        api.get('/bulas')
            .then(dados => this.setState({ bulas: dados.data }))
            .catch(() => this.setState('erro ao recuperar dados'));
    }

    render() {
        const { bulas } = this.state;

        return (
            <div>
                <Header title="SIBMED" />
                <ListGroup>
                {
                    bulas.map(bula => (
                            <ListGroupItem key={bula.id} tag="button" onClick={() => this.handleClick(bula.id)} action>
                                <ListGroupItemHeading>{bula.nomeComercial}</ListGroupItemHeading>
                                <ListGroupItemText>{bula.fabricante}</ListGroupItemText>
                            </ListGroupItem>
                    ))
                }
                 </ListGroup>

                <Button color="primary" size="lg" >Inserir</Button>{' '}
                <Button color="secondary" size="lg" >Pesquisar</Button>

            </div>
        )
    }
}

export class BulaId extends Component {
    render() {
        return (
            <Header title="Listando bula" />
        )
    }
}
