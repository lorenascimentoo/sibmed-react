import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import Header from '../../components/Header';

import api from "../../services/api";

export class ListBulas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bulas: [],
            id : null,
            error:null
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(id) {
        console.log('Clicado');
        console.log(id);
        this.setState({ id : id})
        this.props.history.push(`/bulas/${id}`);
    }

    handleBulaId(id){
        this.setState({ id : id});
        console.log(id);
        try{
            this.props.history.push(`/bulas/${id}`);
          } catch (err) {
            this.setState({
              error:
                "Houve um problema no redirecionamento"
            });
            console.log(this.state.error);
          }
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
                            <ListGroupItem key={bula.id} tag="button" onClick={() => this.handleBulaId(bula.id)} action>
                                <ListGroupItemHeading>{bula.nomeComercial}</ListGroupItemHeading>
                                <ListGroupItemText>{bula.fabricante}</ListGroupItemText>
                            </ListGroupItem>
                    ))
                }
                 </ListGroup>
                <br/>
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
