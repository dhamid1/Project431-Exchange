
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const handleMetaMaskLink = () => {}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          
        </p>
        <Row>
          <Col>ETHEREUM TRANSIT HUB</Col>
          <Col>
            <Button variant="info" size='lg' onClick={handleMetaMaskLink} className="button-nowrap">Connect to MetaMask Wallet</Button>
          </Col>
        </Row>
        <Row><Col>Use Ethereum to buy tickets with airlines, MARC, Amtrak, and the Metro</Col></Row>
      </header>
      
    </div>
  );
}

export default App;
