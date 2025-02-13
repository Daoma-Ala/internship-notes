import React from 'react';
import ReactDOM from 'react-dom/client';
import Knight from './Knight';
import Square from './Square';
import Board from './Board';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Board knightPosition={[0, 0]} />
);

