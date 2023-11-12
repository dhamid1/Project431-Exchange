


import '../App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import connectToMetaMask from '../Connection/connectWallet';



function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleMetaMaskLink = async () => {
    const connectionStatus = await connectToMetaMask();
    if (connectionStatus) {
      setIsConnected(true);
    }
  };
  const [price, setPrice] = useState([]);
  const getPrice = () => {
    axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
    .then((res) => {setPrice(res.data.result.ethusd)})
    
  }
  
  useEffect(() => {
    getPrice()
  }, [isConnected]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          
        </p>
        <Row>
          <Col className='text-nowrap'>ETHEREUM TRANSIT HUB</Col>
          <Col>
          {
            !isConnected ? 
            <Button variant="info" size='lg' onClick={handleMetaMaskLink} className="text-nowrap">Connect to MetaMask Wallet</Button> :
            <p className='text-nowrap'>Successfully Connected to ETH Wallet</p>
          }
          </Col>
        </Row>
        <Row><Col>Use Ethereum to buy tickets with airlines, MARC, Amtrak, and the Metro</Col></Row>
        <Row><Col>Current Price of Ethereum: ${price}</Col></Row>

      </header>
      
    </div>
  );
}

export default App;
