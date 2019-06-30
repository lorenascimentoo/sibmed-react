import React, { Component } from 'react';
import api from '../../services/api';
import GlobalStyle from '../../styles';
import { Container, Content } from './styles';
import { Table } from 'reactstrap';
import { MdDelete } from "react-icons/md";


export class Painel extends Component {
    state = {
        bulas: []
    }

    componentDidMount() {
        api.get("/bulas/usuario")
            .then(dados => this.setState({ bulas: dados.data }))
            .catch(e => {
                alert('Seu token está expirado, faça login novamente" :)');
                this.props.history.push(`/login`);
            });
    }
    
    handleDelete(id) {
        api.delete(`/bulas/${id}`)
        .then(dados => {
            alert(dados.statusText)
            window.location.reload();
        })
            .catch(e => {
                console.log(e)
                //alert('Seu token está expirado, faça login novamente" :)');
                //this.props.history.push(`/login`);
            });
    }

    render() {
        const { bulas } = this.state;
        console.log(bulas);

        return (
            <Container>
                <Content>
                    <div>
                        <h2>Sibmed</h2>
                    </div>

                    <Table hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome Comercial</th>
                                <th>Fabricante</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bulas.map(bula => (
                                    <tr key={bula.id}>
                                        <th>{bula.id}</th>
                                        <th>{bula.nomeComercial}</th>
                                        <th>{bula.fabricante}</th>
                                        <th>
                                        <MdDelete size={24} color="#e57878" onClick={() => this.handleDelete(bula.id)}/>
                                        </th>
                                    </tr>
                                )
                                )
                            }

                        </tbody>
                    </Table>
                </Content>
                <GlobalStyle />
            </Container>

        );
    }
}

export default Painel;