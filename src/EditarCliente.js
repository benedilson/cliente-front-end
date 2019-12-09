import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ViaCep from 'react-via-cep';

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
            item: this.emptyItem,
            errors: {},
            contatos: [],
            emails: []
        };

        this.handleChangeCep = this.handleChangeCep.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    newContato = () => {
        let contatos = this.state.contatos;
        contatos.push({ fone: '', tipo: '' });
        this.setState({ contatos: contatos });
    }

    editTipo = (i, e) =>  {
        let contatos = this.state.contatos;
        contatos[i].tipo = e.target.value;
        this.setState({ contatos: contatos });
    }

    editFone = (i, e) =>  {
        let contatos = this.state.contatos;
        contatos[i].fone = e.target.value;
        this.setState({ contatos: contatos });
    }

    newEmail = () => {
        let emails = this.state.emails;
        emails.push({ enderecoEmail: '' });
        this.setState({ emails: emails });
    }

    editEmail = (i, e) =>  {
        let emails = this.state.emails;
        emails[i].enderecoEmail = e.target.value;
        this.setState({ emails: emails });
    }

    handleValidation(){
        let fields = this.state.item;
        let errors = {};
        let formIsValid = true;

        if(!fields["nome"]){
            formIsValid = false;
            errors["nome"] = "Por favor digite seu nome aqui";
        }

        if(typeof fields["nome"] !== "undefined"){
            if(!fields["nome"].match(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)){
                formIsValid = false;
                errors["nome"] = "O nome fornecido é inválido";
            } else if(fields["nome"].length < 4) {
                formIsValid = false;
                errors["nome"] = "O nome precisa ter mais que 3 caracteres";
            } else if(fields["nome"].length > 100) {
                formIsValid = false;
                errors["nome"] = "O nome precisa ter no máximo 100 caracteres";
            }
        }

        if(!fields["cpf"]){
            formIsValid = false;
            errors["cpf"] = "Por favor digite seu cpf aqui";
        }

        if(typeof fields["cpf"] !== "undefined"){
            if(!fields["cpf"].match(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/)){
                formIsValid = false;
                errors["cpf"] = "O cpf fornecido é inválido";
            } else if(fields["cpf"].length > 14) {
                formIsValid = false;
                errors["cpf"] = "O cpf precisa ter no máximo 14 caracteres";
            }
        }

        if(!fields["cep"]){
            formIsValid = false;
            errors["cep"] = "Por favor digite seu cep aqui";
        }

        if(typeof fields["cep"] !== "undefined"){
            if(!fields["cep"].match(/[0-9]{5}-?[0-9]{3}/)){
                formIsValid = false;
                errors["cep"] = "O cep fornecido é inválido";
            } else if(fields["cep"].length > 9) {
                formIsValid = false;
                errors["cep"] = "O cep precisa ter no máximo 9 caracteres";
            }
        }

        if(!fields["logradouro"]){
            formIsValid = false;
            errors["logradouro"] = "Por favor digite seu logradouro aqui";
        }
        if(!fields["bairro"]){
            formIsValid = false;
            errors["bairro"] = "Por favor digite seu bairro aqui";
        }
        if(!fields["cidade"]){
            formIsValid = false;
            errors["cidade"] = "Por favor digite sua cidade aqui";
        }
        if(!fields["uf"]){
            formIsValid = false;
            errors["uf"] = "Por favor digite seu uf aqui";
        }

        if(!fields["contatos.fone"]){
            formIsValid = false;
            errors["contatos.fone"] = "Por favor digite seu numero aqui";
        }

        if(typeof fields["contatos.fone"] !== "undefined"){
            if(!fields["contatos.fone"].match(/[(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})]/)){
                formIsValid = false;
                errors["contatos.fone"] = "O numero fornecido é inválido";
            } else if(fields["contatos.fone"].length > 15) {
                formIsValid = false;
                errors["contatos.fone"] = "O numero precisa ter no máximo 15 caracteres";
            }
        }

        if(!fields["email.enderecoEmail"]){
            formIsValid = false;
            errors["email.enderecoEmail"] = "Não pode ser vazio";
        }

        if(typeof fields["email.enderecoEmail"] !== "undefined"){
            let lastAtPos = fields["email.enderecoEmail"].lastIndexOf('@');
            let lastDotPos = fields["email.enderecoEmail"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email.enderecoEmail"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email.enderecoEmail"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email.enderecoEmail"] = "Email não é valido";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChangeCep(evt) {
        this.setState({ cep: evt.target.value })
    }
    handleSuccess(cepData) {
        console.log(cepData);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const cliente = await (await fetch(`/api/cliente/${this.props.match.params.id}`)).json();
            this.setState({item: cliente});
        }
    }

    handleChange(field, e){
        let fields = this.state.item;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        for(let cont = 0; cont < this.state.contatos.length; cont++) {
            item.numero = " " + item.numero + " " + this.state.contatos[cont].fone + " " + this.state.contatos[cont].tipo + " ";
        }

        for(let cont = 0; cont < this.state.emails.length; cont++) {
            item.email = item.email + this.state.emails[cont].enderecoEmail + " ";
        }

        if(this.handleValidation()){

            const teste = await fetch('/api/cliente', {
                method: (item.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });

            const testando = await teste.json();
            console.log(testando);

            alert("Formulario enviado");

            this.props.history.push('/clientes');
        }else{
            alert("Formulario tem erros.")
        }
    }

    render() {

        const list = [
            {id: 'Celular', name: 'Celular'},
            {id: 'Residencial', name: 'Residencial'},
            {id: 'Comercial', name: 'Comercial'}
        ];

        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form  className="form col-md-6" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Label for="nome">Nome</Label>
                        <input type="text" size='100' maxLength='100' minLength='3' name="nome" id="nome" defaultValue={item.nome || ''}
                               onChange={this.handleChange.bind(this, "nome")} autoComplete="nome"/>
                        <span style={{color: "red"}}>{this.state.errors["nome"]}</span>
                    </div>
                    <div className="form-group">
                        <Label for="cpf">CPF</Label>
                        <input type="text" name="cpf" size='14' maxLength='14' id="cpf" placeholder="000.000.000-00" defaultValue={item.cpf || ''}
                               onChange={this.handleChange.bind(this, "cpf")} autoComplete="cpf"/>
                        <span style={{color: "red"}}>{this.state.errors["cpf"]}</span>
                    </div>
                    <div className="form-group">
                    <ViaCep cep={this.state.cep} onSuccess={this.handleSuccess} lazy>
                        { ({ data, loading, error, fetch }) => {
                            if (loading) {
                                return <p>loading...</p>
                            }
                            if (error) {
                                return <p>error</p>
                            }
                            if (data) {

                                item.cep = data.cep;
                                item.logradouro = data.logradouro;
                                item.bairro = data.bairro;
                                item.cidade = data.localidade;
                                item.uf = data.uf;
                                item.complemento = data.complemento;

                                return <div>
                                    <div className="row">
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label>CEP</Label>
                                            <input type="text" size="9" maxLength='9' name="cep" placeholder="00000-000" defaultValue={item.cep || ''}
                                                   onChange={this.handleChange.bind(this, "cep")} autoComplete="cep"/>
                                            <span style={{color: "red"}}>{this.state.errors["cep"]}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label for="logradouro">Logradouro</Label>
                                            <input type="text"
                                                   name="logradouro"
                                                   id="logradouro"
                                                   defaultValue={item.logradouro || ''}
                                                   onChange={this.handleChange.bind(this, "logradouro")} autoComplete="logradouro"/>
                                            <span style={{color: "red"}}>{this.state.errors["logradouro"]}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label for="bairro">Bairro</Label>
                                            <input type="text" name="bairro" id="bairro" defaultValue={item.bairro || ''}
                                                   onChange={this.handleChange.bind(this, "bairro")} autoComplete="bairro"/>
                                            <span style={{color: "red"}}>{this.state.errors["bairro"]}</span>
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label for="cidade">Cidade</Label>
                                            <input type="text" name="cidade" id="cidade" defaultValue={item.cidade || ''}
                                                   onChange={this.handleChange.bind(this, "cidade")} autoComplete="cidade"/>
                                            <span style={{color: "red"}}>{this.state.errors["cidade"]}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label for="uf">UF</Label>
                                            <input type="text" name="uf" id="uf" maxLength='2' defaultValue={item.uf || ''}
                                                   onChange={this.handleChange.bind(this, "uf")} autoComplete="uf"/>
                                            <span style={{color: "red"}}>{this.state.errors["uf"]}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-4 mb-3">
                                            <Label for="complemento">Complemento</Label>
                                            <input type="text" name="complemento" id="complemento" defaultValue={item.complemento || ''}
                                                   onChange={this.handleChange.bind(this, "complemento")} autoComplete="complemento"/>
                                        </FormGroup>
                                    </div>
                                </div>
                            }
                            return <div>
                                <Label>CEP</Label>
                                <FormGroup className="col-md-4 mb-2">
                                    <input id="cep"
                                           size='9'
                                           max='9'
                                           maxLength='9'
                                           name="cep"
                                           onChange={this.handleChangeCep}
                                           defaultValue={this.state.cep}
                                           placeholder="00000-000"
                                           autoComplete="cep" type="text"/>
                                    <button onClick={fetch}>Pesquisar</button>
                                    <span style={{color: "red"}}>{this.state.errors["cep"]}</span>
                                </FormGroup>
                            </div>
                        }}
                    </ViaCep>
                    </div>
                    <div className="form-group">
                        {this.state.contatos.map((c, i) =>
                            <div key={i}>
                                <p>
                                    <label>#{i} - Fone</label>
                                    <input type="text"
                                           maxLength='15'
                                           defaultValue={c.fone}
                                           onBlur={this.handleChange.bind(this, "contatos.fone")}
                                           onChange={e => this.editFone(i, e)} />
                                    <span style={{color: "red"}}>{this.state.errors["contatos.fone"]}</span>
                                </p>
                                <p>
                                    <label>#{i} - Tipo</label>
                                    <select defaultValue={c.tipo} onChange={e => this.editTipo(i, e)} onBlur={this.handleChange.bind(this, "contatos.tipo")}>
                                        {list.map((itemSelecionado, index) => (
                                            <option defaultValue={itemSelecionado.id}>{itemSelecionado.name}</option>
                                        ))}
                                    </select>
                                </p>
                            </div>
                        )}
                        <button type='button' onClick={this.newContato}>Add Contato</button>
                    </div>
                    <div className="form-group">
                        {this.state.emails.map((c, i) =>
                            <div key={i}>
                                    <label>#{i} - E-mail</label>
                                    <input type="text"
                                           defaultValue={c.enderecoEmail}
                                           onBlur={this.handleChange.bind(this, "email.enderecoEmail")}
                                           onChange={e => this.editEmail(i, e)} />
                                    <span style={{color: "red"}}>{this.state.errors["email.enderecoEmail"]}</span>
                            </div>
                        )}
                        <button type='button' onClick={this.newEmail}>Add E-mail</button>
                    </div>
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