import React from 'react';
import Background from './components/commons/Background/';
import Navbar from './components/commons/Navbar';
import CharacterList from './components/CharacterList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Championship from './components/Championship';


function App() {
  return (
    <Router>
      <Background>
        <Navbar/>
        <Switch>
          <Route path="/fight">
            <Championship/>
          </Route>
          <Route path="/">
            <CharacterList/>
          </Route>
        </Switch>
      </Background>
    </Router>
  );
}

export default App;
