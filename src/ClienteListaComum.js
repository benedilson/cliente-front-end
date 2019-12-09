import React, { Component } from 'react';
import {Button, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from "react-router-dom";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {clientes: [], isLoading: true};
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/clientes')
            .then(response => response.json())
            .then(data => this.setState({clientes: data, isLoading: false}));
    }

    render() {
        const {clientes, isLoading} = this.state;

        if (isLoading) {
            return <p>Carregando...</p>;
        }

        const list = clientes.map(cliente => {
            const address = `${cliente.cpf || ''} ${cliente.cep || ''} ${cliente.logradouro || ''} ${cliente.bairro || ''} ${cliente.cidade || ''} 
            ${cliente.uf || ''} ${cliente.complemento || ''} ${cliente.numero || ''} ${cliente.email || ''}`;
            return <tr key={cliente.id}>
                <td style={{whiteSpace: 'nowrap'}}>{cliente.nome}</td>
                <td>{address}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Clientes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nome</th>
                            <th width="20%">Informações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default List;