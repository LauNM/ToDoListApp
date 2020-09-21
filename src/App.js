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
    this.state.users.forEach((user , index ) => {
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



  newLogin = (newLogin, newPassword, confirmPassword) => {
    let connected = false;
    
   
    this.state.users.forEach((user, index)=> {

      if( user.id !== newLogin && newPassword === confirmPassword) {
        connected = true;
        let newUser = {
        id: newLogin,
        pwd: newPassword,
        tasks: [] };
        this.setState({ users: [...this.state.users, newUser] ,
            userIndexConnected: index,
            userLoginConnected: newLogin,
            userTasksConnected: user.tasks
          });
        
      }
    })
    if (!connected) {
      if(newPassword !== confirmPassword){
        alert("Erreur dans le mot de passe");
      }
     /*  Ne pas créer de compte si le nom d'utilisateur est déjà utilisé - ne marche pas
      else if (this.state.users.id === newLogin){
         return alert("Nom d'utilisateur déjà prit !")
      } */
    }
}
   
      /* essai pour newLogin en ternaire
      newLogin = (newLogin, newPassword) => {
   
        let newUser = {};
        //this.state.users.forEach((user)=> {
          // {newPassword !== confirmPassword?
          // //alerte("Erreur dans confirmation du mot de passe !")
          // newUser = {
          //   id: '',
          //   pwd: '',
          //   tasks: []
          // }
          // :
            this.state.user.id === newLogin?
            
            alert("Cet identifiant est déjà prit !")
            :
            newUser = {
              id: newLogin,
              pwd: newPassword,
              tasks: []
            }
            this.setState({ users: [...this.state.users, newUser] })
          
          }
          //)}
 */
    
  
    
    
  


  /*checkAdd = (user) => {
    this.setState({
      users: [...this.state.users, user]

    })
  }*/


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

  deconnection = () => {
    this.setState({ userLoginConnected: "", isClicked: false});
  }


  handleNewAccountClick = (isClicked) => {
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
              <Form addTache={this.addTache} />
              <List taches={userTasksConnected} checkTache={this.checkTache} />
              <button onClick={this.removeChecked}>Supprimer les tâches accomplies</button>
              <button onClick={this.removeAllTaches}>Supprimer toutes les tâches</button>
              <div>
                <button onClick={this.deconnection}>Déconnexion</button>
              </div>

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

    /* let formOrList = <Connection verifyLogin={this.checkLogin} />;
    if (this.state.userLoginConnected) {
      formOrList = <TodoList />;
    }

    return (
      {formOrList}
    ); */
  }
}

export default App;
