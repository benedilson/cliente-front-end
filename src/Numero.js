import {FormGroup, Label} from "reactstrap";
import React, {Component} from "react";
import ReactDOM from 'react-dom';

class Numero extends Component {

    vazio = {
        numero: ''
    }

    constructor(props) {
        super(props);
        this.state =  {
            item: this.vazio,
            errors: {}
        }
    }


    handleChange(field, e){
        let fields = this.state.item;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {

        return (
            <FormGroup className="col-md-4 mb-3">
                <Label for="numero">Número</Label>
                <input type="text" maxLength='15'
                       name="numero" value={this.state.numero || ''}
                       onChange={this.handleChange.bind(this, "numero")} autoComplete="numero"/>
                <span style={{color: "red"}}>{this.state.errors["numero"]}</span>
            </FormGroup>
        )

    }
}

export default Numero;