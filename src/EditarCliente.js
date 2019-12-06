import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EditarCliente extends Component {

    emptyItem = {
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        numero: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const cliente = await (await fetch(`/api/cliente/${this.props.match.params.id}`)).json();
            this.setState({item: cliente});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/cliente', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/clientes');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}
                               onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cpf">CPF</Label>
                        <Input type="text" name="cpf" id="cpf" value={item.cpf || ''}
                               onChange={this.handleChange} autoComplete="cpf"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cep">CEP</Label>
                        <Input type="text" name="cep" id="cep" value={item.cep || ''}
                               onChange={this.handleChange} autoComplete="cep"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="logradouro">Logradouro</Label>
                            <Input type="text" name="logradouro" id="logradouro" value={item.logradouro || ''}
                                   onChange={this.handleChange} autoComplete="logradouro"/>
                        </FormGroup>
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="bairro">Bairro</Label>
                            <Input type="text" name="bairro" id="bairro" value={item.bairro || ''}
                                   onChange={this.handleChange} autoComplete="bairro"/>
                        </FormGroup>
                        <FormGroup className="col-md-2 mb-3">
                            <Label for="cidade">Cidade</Label>
                            <Input type="text" name="cidade" id="cidade" value={item.cidade || ''}
                                   onChange={this.handleChange} autoComplete="cidade"/>
                        </FormGroup>
                        <FormGroup className="col-md-2 mb-3">
                            <Label for="uf">UF</Label>
                            <Input type="text" name="uf" id="uf" value={item.uf || ''}
                                   onChange={this.handleChange} autoComplete="uf"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="complemento">Complemento</Label>
                        <Input type="text" name="complemento" id="complemento" value={item.complemento || ''}
                               onChange={this.handleChange} autoComplete="complemento"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="numero">Número</Label>
                            <Input type="text" name="numero" id="numero" value={item.numero || ''}
                                   onChange={this.handleChange} autoComplete="numero"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/clientes">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditarCliente);