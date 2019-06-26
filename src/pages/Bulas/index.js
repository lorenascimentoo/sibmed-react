import React, { Component } from "react";

import api from "../../services/api";

export class ListBulas extends Component {
    state = {
        bulas: []
    }

    componentWillMount() {
        api.get('/bulas')
            .then(dados => this.setState({bulas: dados.data}))
            .catch(() => this.setState('erro ao recuperar dados'));
    }
  
    render() {
        const { bulas } = this.state;
        console.log(bulas);
        return (
            <ul>
                {this.state.bulas.map(function(item,index){
                    return <div key={item.id}>
                            <h1>{item.nomeComercial}</h1>
                            <h3>{item.fabricante}</h3>
                        </div>
                })}
            </ul>
        );
    }
}