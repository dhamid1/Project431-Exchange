

import NavBar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import TransactionPage from './pages/TransactionPage'
import SendMoney from './pages/SendMoney';
// App.js


import React, { useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  

  return (
    <div className="App">

      <Router>
      <NavBar />
      
      <header className="App-header">
      <Routes>
      <Route exact path='/' element={<><Home /></>} />
      <Route exact path='/TransactionPage' element={<TransactionPage />}/>
      <Route exact path='/SendMoney' element={<SendMoney />}/>
      </Routes>
      </header>
      </Router>
    </div>
  );
}

export default App;
