import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {clientes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/clientes')
            .then(response => response.json())
            .then(data => this.setState({clientes: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/cliente/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updated = [...this.state.clientes].filter(i => i.id !== id);
            this.setState({clientes: updated});
        });
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
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/api/cliente/" + cliente.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(cliente.id)}>Deletar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/api/cliente/new">Adicionar Cliente</Button>
                    </div>
                    <h3>Clientes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nome</th>
                            <th width="20%">Informações</th>
                            <th width="10%">Ações</th>
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