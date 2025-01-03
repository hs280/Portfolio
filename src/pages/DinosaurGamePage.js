import React from 'react';
import DinosaurGameComponent from './DinosaurGameComponent';

function DinosaurGamePage({ darkMode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dinosaur Game</h1>
      <DinosaurGameComponent darkMode={darkMode} />
    </div>
  );
}

export default DinosaurGamePage;
