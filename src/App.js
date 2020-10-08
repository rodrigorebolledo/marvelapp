import React from 'react';
import Background from './components/commons/Background/';
import Navbar from './components/commons/Navbar';
import CharacterList from './components/CharacterList';

function App() {
  return (
    <Background>
      <Navbar/>
      <CharacterList/>
    </Background>
  );
}

export default App;
