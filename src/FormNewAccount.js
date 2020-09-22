import React, { Component } from 'react';


class FormNewAccount extends Component {

    initialState = {
        newUserLogin: "",
        newUserPassword: "",
        confirmUserPassword: ""
    };

    state = this.initialState;

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

      /* handleSubmit = event => {
          event.preventDefault();
        
        if (this.state.newUserPassword !== this.state.confirmUserPassword) {
            alert("Attention erreur dans le mot de passe !")
        } else {
             this.props.createLogin(this.state.newUserLogin, this.state.newUserPassword)
             this.setState(this.initialState);
            
        }
          
      } */

      handleSubmit = event => {
        event.preventDefault();
      
      this.state.newUserPassword !== this.state.confirmUserPassword ?
          alert("Attention erreur dans le mot de passe !")
      :
           this.props.createLogin(this.state.newUserLogin, this.state.newUserPassword)
           this.setState(this.initialState);
          
      }
        
    



    render() {
        return (
            <div>
                <h2>Création d'un nouveau compte d'Utilisateur</h2>
                
                <form onSubmit={this.handleSubmit}>
                   <label htmlFor="login">Nouvel Identifiant : </label>
                    <input
                        type="text"
                        name="newUserLogin"
                        id="login"
                        placeholder="Votre identifiant"
                        value={this.state.newUserLogin}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    
                    <label htmlFor="password">Mot de passe : </label>
                    <input
                        type="password"
                        name="newUserPassword"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={this.state.newUserPassword}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    
                    <label htmlFor="password">Confirmation du Mot de passe : </label>
                    <input
                        type="password"
                        name="confirmUserPassword"
                        id="confirmationPwd"
                        placeholder="Confirmez votre mot de passe"
                        value={this.state.confirmUserPassword}
                        onChange={this.handleChange}
                        /* onChange={this.handleChangePassword} */
                        required
                        minLength="6"
                    />
                    
                    
                   
                        <input type="submit" value="Valider" />
                    


                </form>
                
            </div>
        );
    }
}

export default FormNewAccount;