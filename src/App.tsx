import React from 'react';
import { MainRouter } from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <MainRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
