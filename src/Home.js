import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';

class Home extends Component {

    constructor(){
        super();
        this.state = {usuario: '', password: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setUsuario = this.setUsuario.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    async enviaForm(event) {
        event.preventDefault();

        if (this.state.usuario.length === 0 || this.state.senha.length === 0) {
            this.setState({error: 'Preencha usuário e senha para continuar!'}, () => false);
        } else {
            try {

                if(this.state.usuario === "admin" && this.state.senha === "123456" ) {
                    window.location.pathname = '/clientes';
                }
                if(this.state.usuario === "comum" && this.state.senha === "123456" ) {
                    window.location.pathname = '/clientesComum';
                }

            } catch (_err) {
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            }
        }
    }

    setUsuario (event){
        this.setState({usuario: event.target.value});
    }

    setSenha (event){
        this.setState({senha: event.target.value});
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <form className="form col-md-6" onSubmit={this.enviaForm}>

                            <div className="form-group">
                                <label htmlFor="usuario">Usuario: </label>
                                <input type="text" id="usuario" className="form-control" name="usuario" value={this.state.usuario} onChange={this.setUsuario} placeholder="Usuario"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="senha">Senha: </label>
                                <input type="password" id="senha" className="form-control" name="senha" value={this.state.senha} onChange={this.setSenha} placeholder="Senha"/>
                            </div>

                            <button type="submit" className="btn btn-success">Login</button>

                        </form>

                        <div className="col-md-3"></div>
                    </div>

                </Container>
            </div>
        );
    }
}

export default Home;