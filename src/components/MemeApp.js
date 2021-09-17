import '../App.css';
import React from 'react';
import Header from './Header';
import MemeGenerator from './MemeGenerator';

function MemeApp() {
  return (
    <div className="App">
      <Header />
      <MemeGenerator />
    </div>
  );
}

export default MemeApp;
