import React, { Component } from 'react';
import Connection from './Connection';
import Form from './Form';
import List from './List';
import FormNewAccount from './FormNewAccount';

class App extends Component {
  state = {
    users: [
      {
        id: "laurie",
        pwd: "555555",
        tasks: [
          { name: "Faire le café", checked: false },
          { name: "Dire bonjour au voisin", checked: true }
        ]
      },
      {
        id: "jean",
        pwd: "111111",
        tasks: []
      }
    ],
    userIndexConnected: -1,
    userLoginConnected: "",
    userTasksConnected: [],
    isClicked: false
  };

  checkLogin = (login, password) => {
    let connected = false;
    this.state.users.forEach((user, index) => {
      if (login === user.id && password === user.pwd) {
        connected = true;

        this.setState({
          userIndexConnected: index,
          userLoginConnected: user.id,
          userTasksConnected: user.tasks
        });
      }
    });

    if (!connected) {
      alert("Ce couple identifiant / mot de passe n'existe pas !");
    }
  }

  newLogin = (newLogin, newPassword) => {
    let connected = false;
    if (this.state.users.find(({ id }) => id === newLogin)) {
      return alert("Nom d'utilisateur déjà prit !");

    }
    else if (!connected) {

      let newUser = {
        id: newLogin,
        pwd: newPassword,
        tasks: []
      };
      this.setState({
        users: [...this.state.users, newUser],
        userIndexConnected: this.state.users.length,
        userLoginConnected: newLogin,
        userTasksConnected: []
      });
    }
  }


  updateUserTasks = () => {
    this.setState({
      users: this.state.users.map(user => {
        if (user.id === this.state.userLoginConnected) {
          user.tasks = this.state.userTasksConnected;
        }
        return user;
      })
    });
  }

  addTache = tache => {
    /* let mesTaches = this.state.taches.slice();
    mesTaches.push({ name: tache });
    this.setState({taches: mesTaches}); */
    this.setState({ userTasksConnected: [...this.state.userTasksConnected, { name: tache, checked: false }] }, this.updateUserTasks);
  }


  checkTache = index => {
    this.setState({
      userTasksConnected: this.state.userTasksConnected.map((tache, i) => {
        if (index === i) {
          tache.checked = !tache.checked;
        }
        return tache;
      })
    }, this.updateUserTasks);
  }

  removeChecked = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer vos todos accomplies ?")) {
      /* this.setState({ taches: this.state.taches.filter((tache, i) => {
        return !tache.checked;
      })}); */
      this.setState({ userTasksConnected: this.state.userTasksConnected.filter(tache => !tache.checked) }, this.updateUserTasks);
    }
  }

  removeAllTaches = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes vos todos ?")) {
      this.setState({ userTasksConnected: [] }, this.updateUserTasks);
    }
  }

  logout = () => {
    this.setState({ userLoginConnected: "", isClicked: false });
  }


  handleNewAccountClick = () => {
    this.setState({ isClicked: !this.state.isClicked });

  }

  render() {
    const { userLoginConnected, userTasksConnected, isClicked } = this.state;
    return (
      <div>
        <h1>Todo List</h1>
        {
          userLoginConnected !== "" ?
            <div>
              <div>
                <button className="logoutBtn"onClick={this.logout}>Déconnexion</button>
              </div>
              <Form addTache={this.addTache} />
              <List taches={userTasksConnected} checkTache={this.checkTache} />
              <button onClick={this.removeChecked}>Supprimer les tâches accomplies</button>
              <button onClick={this.removeAllTaches}>Supprimer toutes les tâches</button>
              

            </div>
            :
            <div>
              {isClicked !== true ?

                <div>
                  <Connection verifyLogin={this.checkLogin} />
                  <button onClick={this.handleNewAccountClick}>Créer un compte</button>
                </div>
                :
                <div>
                  <button onClick={this.handleNewAccountClick}>Retour Espace de Connexion</button>
                  <FormNewAccount createLogin={this.newLogin} />
                </div>
              }
            </div>
        }
      </div>
    );
  }
}

export default App;
