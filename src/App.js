import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClienteLista from './ClienteLista';
import EditarCliente from "./EditarCliente";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/clientes' exact={true} component={ClienteLista}/>
            <Route path='/api/cliente/:id' component={EditarCliente}/>
          </Switch>
        </Router>
    )
  }
}

export default App;