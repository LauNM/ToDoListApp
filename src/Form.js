import React, {Component} from 'react';

class Form extends Component {
    initialState = {
        inputTacheValue: ""
    }

    state = this.initialState;

    handleChange = event => {
        this.setState({ inputTacheValue: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addTache(this.state.inputTacheValue);
        this.setState(this.initialState);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="tache"
                    placeholder="Que voulez-vous faire ?"
                    value={this.state.inputTacheValue}
                    onChange={this.handleChange} />
                <input type="submit" value="Ajouter" />
            </form>
        );
    }
}

export default Form;
