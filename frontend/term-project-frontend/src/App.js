

import NavBar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import TransactionPage from './pages/TransactionPage'
import SendMoney from './pages/SendMoney';
import About from './pages/About';
import Contact from './pages/Contact';
// App.js


import React, { useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatbot from './pages/Chatbot';





function App() {
  

  return (
    <div className="App">

      <Router>
      <NavBar />
      
      <header className="App-header">
      <Routes>
      <Route exact path='/About' element={<About/>}/>
      <Route exact path='/' element={<><Home /></>} />
      <Route exact path='/TransactionPage' element={<TransactionPage />}/>
      <Route exact path='/SendMoney' element={<SendMoney />}/>
      <Route exact path='/Contact' element={<Contact />}/>
      <Route exact path='/Chatbot' element={<Chatbot />}/>
      </Routes>
      </header>
      </Router>
    </div>
  );
}

export default App;
