import React, { Component } from 'react';
import api from '../../services/api';
import GlobalStyle from '../../styles';
import { Container, Content } from './styles';
import { Table } from 'reactstrap';
import { MdDelete, MdCloudUpload } from "react-icons/md";
import Header from '../../components/Header';


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
    handlePage(){
        this.props.history.push(`/upload`);
    }
    
    handleDelete(id) {
        api.delete(`/bulas/${id}`)
        .then(dados => {
            alert(dados.statusText)
            window.location.reload();
        })
            .catch(e => {
                console.log(e)
                alert('Você não está logado ou seu token está expirado, faça login novamente" :)');
                this.props.history.push(`/login`);
            });
    }

    render() {
        const { bulas } = this.state;
        console.log(bulas);

        return (
            <Container>
                <Content>
                    <Header title={"Gestão de Bula"} />
                    <p>Olá, bem vindo a painel de gestão de bulas!</p>

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

                    <MdCloudUpload size={50} color="#e57878" onClick={() => this.handlePage()}/>
                </Content>
                <GlobalStyle />
                
            </Container>

        );
    }
}

export default Painel;