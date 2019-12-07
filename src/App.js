import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClienteLista from './ClienteLista';
import EditarCliente from "./EditarCliente";
import ClienteListaComum from "./ClienteListaComum";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/clientes' exact={true} component={ClienteLista}/>
              <Route path='/clientesComum' exact={true} component={ClienteListaComum}/>
            <Route path='/api/cliente/:id' component={EditarCliente}/>
          </Switch>
        </Router>
    )
  }
}

export default App;