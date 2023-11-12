import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function Trans() {
    const [price, setPrice] = useState([]);
    const [gasPrice, setGasPrice] = useState([]);
    const [value, setValue] = useState([]);
    const getPrice = () => {
    axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
    .then((res) => {setPrice(res.data.result.ethusd)})
    axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
    .then((res) => {setGasPrice(res.data.result.ProposeGasPrice)})
    
  }
  const handleChange = e => {
    setValue(e.target.value)
  }
  useEffect(() => {
    getPrice()
  }, []);
    return(
    <div>
      <header>
      <Row>
          <Col className='text-nowrap'>Buy Tickets</Col>
      </Row>
      <Row>
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      justify
      className="mb-3"
    >
      <Tab eventKey="plane" title="Plane">
        Plane Tickets
      </Tab>
      <Tab eventKey="train" title="Train">
        Train Tickets
      </Tab>
      <Tab eventKey="metro" title="Metro">
        <Row>
            <Col>
            Refill your Metro Card
            </Col>
            <Col>
            <InputGroup className='text-nowrap'>
                <InputGroup.Text id="dcmetro">$</InputGroup.Text>
                <Form.Control
                className='w-50'
                type="text"
                placeholder="0.00"
                aria-label="refill your metro card"
                aria-describedby="dcmetro"
                onChange={handleChange}
          />
            </InputGroup>
            </Col>
            <Col>
                {value/price} ETH
            </Col>
            <Col>
                Gas Price: {gasPrice*21000}  
                <a href='https://www.investopedia.com/terms/g/gwei-ethereum.asp#:~:text=Key%20Takeaways-,Gwei%20is%20a%20denomination%20of%20the%20cryptocurrency%20ether%20(ETH)%2C,to%20specify%20Ethereum%20gas%20prices.'>
                    Gwei
                </a>
            </Col>
        </Row>
        
      </Tab>
    </Tabs>
    </Row>
      </header>
    </div>
    )
}
export default Trans;