import React from 'react';
import TopBar from './Components/TopBar';
import { HashRouter,BrowserRouter } from 'react-router-dom'
import IndexRouter from './Router/IndexRouter';

function App() {
  return (
    <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
  );
}

export default App;
