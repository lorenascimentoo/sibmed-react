import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import Header from '../../components/Header';

import api from "../../services/api";

export class ListBulas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bulas: [],
            bulaId: null
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    handleClick(id) {
        this.setState({ bulaId : id });
        console.log('Clicado');
    }

    componentWillMount() {
        api.get('/bulas')
            .then(dados => this.setState({ bulas: dados.data }))
            .catch(() => this.setState('erro ao recuperar dados'));
    }

    render() {
        const { bulas } = this.state;
        console.log(bulas);
        return (
            <div>
                <Header title="SIBMED" />
                <ListGroup>
                    {this.state.bulas.map(function (item, index) {
                        return (
                            <button type="submit" key={item.id} >
                                    <ListGroupItem  action>
                                        <ListGroupItemHeading>{item.nomeComercial}</ListGroupItemHeading>
                                        <ListGroupItemText>{item.fabricante}</ListGroupItemText>
                                    </ListGroupItem>
                            </button>
                        )
                    })}
                </ListGroup>
                <Button color="primary" size="lg" >Inserir</Button>{' '}
                <Button color="secondary" size="lg" >Pesquisar</Button>

            </div>
        )
    }
}
