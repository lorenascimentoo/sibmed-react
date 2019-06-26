import React, { Component } from "react";

import api from "../../services/api";

export class ListBulas extends Component {
    state = {
        bulas: []
    }

    componentDidMount() {
        fetch(api.get("/bulas"))
            .then(response => response.json())
            .then(bulas => this.setState({ bulas }))
            .catch(e => console.log(e));
    }

    render() {
        const { bulas } = this.state;
        console.log(bulas);
        return (
            <div>
                <h2>Bulas</h2>
            </div>
        );
    }
}