import React from 'react';
import './App.css';
import { MainRouter } from "./Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
		<MainRouter />
		<ToastContainer />
    </div>
  );
}

export default App;
