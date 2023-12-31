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
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMetaMaskLink = async () => {
    const connectionStatus = await connectToMetaMask();
    if (connectionStatus) {
      setIsConnected(true);
    }
  };

  useEffect(() => {
    getPrice();
  }, [isConnected]);

  const getPrice = () => {
    setLoading(true);
    axios
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
      .then((res) => {
        setPrice(res.data.result.ethusd);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          className="video"
        >
          <source src="/ethereumVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay-container">
          <h1>ETHEREUM TRANSIT HUB</h1>
          <p>Elevate your travel game: book train and plane tickets seamlessly with Ethereum</p>
          {!isConnected ? (
            <Button variant="info" size='lg' onClick={handleMetaMaskLink} style={{ backgroundColor: 'rgb(255,255,0)', borderColor: 'rgb(255,255,0)' }}className="text-nowrap">
              Connect to MetaMask Wallet
            </Button>
          ) : (
            <p className='text-nowrap'>Successfully Connected to ETH Wallet</p>
          )}
          <p>Current Price of Ethereum: {loading ? 'Loading...' : `$${price}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;