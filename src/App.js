import React from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router} from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
function App(){
  const [{user}] = useStateValue();
  return(
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="appbody">
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>
              <Route path='/'>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}
export default App;

//Deployment Link
// https://cra.link/deployment


// Hosting URL
// https://uvwhatsapp.web.app


// project console
//https://console.firebase.google.com/project/uvwhatsapp/overview