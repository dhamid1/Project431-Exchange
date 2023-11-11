import NavBar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'

import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import axios from 'axios';




function App() {
  const [buttonShow, setButtonShow] = useState([])
  const [price, setPrice] = useState([]);
  const getPrice = () => {
    axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
    .then((res) => {setPrice(res.data.result.ethusd)})
    
  }
  const handleMetaMaskLink = () => {
    setButtonShow(false)
  }
  
  useEffect(() => {
    getPrice()
  }, [buttonShow]);
  return (
    <div className="App">
      <Router>
      <NavBar />
      
      <header className="App-header">
      <Routes>
      <Route exact path='/' element={<><Home /></>} />
      </Routes>
      </header>
      </Router>
    </div>
  );
}

export default App;
