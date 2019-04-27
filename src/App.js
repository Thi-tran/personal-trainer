import React, { Component } from 'react';
import './App.css';

import AppRouter from './router/AppRouter';
import { auth, provider } from './firebase';

// Used for authentication
export const UserContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      test: ""
    }
  }
  
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user:null
        })
      })
  }

  login = async () => {
    await auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      })
    console.log(this.state.user)
  }

  
  render() {
    const {user} = this.state;
    const {logout} = this;
    return (
      <div className="App"> 
        <UserContext.Provider value={{user, logout}}>
          <AppRouter user={user} logout={logout}/>   
        </UserContext.Provider>  

        {!user && <button className="btn btn-primary" onClick={this.login}>Login with Google</button>}
      </div>
      
    );
  }
}


export default App;
