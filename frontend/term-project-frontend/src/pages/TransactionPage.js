import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import './Trans.css';
import Metro_ABI from './../utils/Metro_ABI.json'
import axios from 'axios';
const ethers = require("ethers");


function Trans() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [tripType, setTripType] = useState('one-way');
  const [departingFrom, setDepartingFrom] = useState('');
  const [departingDate, setDepartingDate] = useState(new Date());
  const [numTravelers, setNumTravelers] = useState(1);
  const [classType, setClassType] = useState('economy');
  const [returningTo, setReturningTo] = useState('');
  const [returningDate, setReturningDate] = useState(new Date());
  const [numPassengers, setNumPassengers] = useState(1);
  const [metroCardNumber, setMetroCardNumber] = useState('');
  const [refillAmount, setRefillAmount] = useState(0);
  const [metroAmount, setMetroAmount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState(null);
  const getPrice = () => {
    axios
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
      .then((res) => {
        return res.data.result.ethusd;
      })
  };
  const renderFlightFields = () => (
    <>
      <Form.Group controlId="departingFrom">
        <Form.Control
          type="text"
          placeholder="From"
          value={departingFrom}
          onChange={(e) => setDepartingFrom(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="returningTo">
        {tripType === 'two-way' && (
          <Form.Control
            type="text"
            placeholder="To"
            value={returningTo}
            onChange={(e) => setReturningTo(e.target.value)}
          />
        )}
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="tripType">
            <Form.Label>Trip Type</Form.Label>
            <Form.Control
              as="select"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option value="one-way">One Way</option>
              <option value="two-way">Round Trip</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="departingDate">
            <Form.Label>Departure</Form.Label>
            <DatePicker
              selected={departingDate}
              onChange={(date) => setDepartingDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Enter departing date"
            />
          </Form.Group>
        </Col>
        {tripType === 'two-way' && (
          <Col>
            <Form.Group controlId="returningDate">
              <Form.Label>Return</Form.Label>
              <DatePicker
                selected={returningDate}
                onChange={(date) => setReturningDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Enter returning date"
              />
            </Form.Group>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="numTravelers">
            <Form.Label>Passengers</Form.Label>
            <Form.Control
              type="number"
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="classType">
            <Form.Label>Class</Form.Label>
            <Form.Control
              as="select"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </>
  );

  const renderTrainFields = () => (
    <>
      <Form.Group controlId="departingFrom">
        <Form.Control
          type="text"
          placeholder="From"
          value={departingFrom}
          onChange={(e) => setDepartingFrom(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="returningTo">
        {tripType === 'two-way' && (
          <Form.Control
            type="text"
            placeholder="To"
            value={returningTo}
            onChange={(e) => setReturningTo(e.target.value)}
          />
        )}
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="tripType">
            <Form.Label>Trip Type</Form.Label>
            <Form.Control
              as="select"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option value="one-way">One Way</option>
              <option value="two-way">Round Trip</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="departingDate">
            <Form.Label>Departure</Form.Label>
            <DatePicker
              selected={departingDate}
              onChange={(date) => setDepartingDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Enter departing date"
            />
          </Form.Group>
        </Col>
        {tripType === 'two-way' && (
          <Col>
            <Form.Group controlId="returningDate">
              <Form.Label>Return</Form.Label>
              <DatePicker
                selected={returningDate}
                onChange={(date) => setReturningDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Enter returning date"
              />
            </Form.Group>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="numPassengers">
            <Form.Label>Number of Passengers:</Form.Label>
            <Form.Control
              type="number"
              value={numPassengers}
              onChange={(e) => setNumPassengers(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="classType">
            <Form.Label>Class Type:</Form.Label>
            <Form.Control
              as="select"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </>
  );

  const renderMetroFields = () => (
    <>
      <p>Current Balance: {metroAmount}</p>
      <Form.Group controlId="refillAmount">
        <Form.Label>Refill Amount:</Form.Label>
        <Form.Control
          type="number"
          value={refillAmount}
          onChange={(e) => setRefillAmount(e.target.value)}
        />
        <Button onClick={handleMetro}>Submit</Button>
      </Form.Group>
    </>
  );

  const handleFlightSearch = () => {
    console.log('Performing flight search:', {
      departingFrom,
      returningTo,
      departingDate,
      returningDate,
      numTravelers,
      classType,
    });
    // Add your flight search logic here
  };

  const handleTrainSearch = () => {
    console.log('Performing train search:', {
      departingFrom,
      returningTo,
      departingDate,
      returningDate,
      numPassengers,
      classType,
    });
    // Add your train search logic here
  };

  const handleMetroSearch = () => {
    console.log('Performing metro search:', {
      metroCardNumber,
      refillAmount,
    });
    // Add your metro search logic here
  };
  const handleMetro = async () => {
    const address = "0x8A4e87b4344120F4Fc40D3FCaffF573f2688A26B"; // insert contract address once deployed
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const box =  new ethers.Contract(address, Metro_ABI, provider);
    const Box = box.connect(signer)
    console.log('submitting metro')
    try {
    const Accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = Accounts[0];
    setCurrentAccount(account);
    
    await Box.fillCard({ value: await refillAmount/getPrice()});
    console.log(await Box.balance());

    }
    catch (error) {
      console.error('Error connecting to MetaMask:', error);
      console.log('No ETH wallet detected');
    }
  }

  return (
    <div>
      <header>
        <Row>
          <Col className='text-nowrap'>Buy Tickets</Col>
        </Row>
        <Tabs
          defaultActiveKey={null}
          id='uncontrolled-tab-example'
          justify
          className='mb-3'
          onSelect={(tab) => setSelectedTab(tab)}
        >
          <Tab eventKey='plane' title='Plane'>
            <Row>
              <Col>
                Plane Tickets
                <div className='mt-3'>
                  {renderFlightFields()}
                </div>
                <Button variant="primary" onClick={handleFlightSearch}>
                  Search Flights
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey='train' title='Train'>
            <Row>
              <Col>
                Train Tickets
                <div className='mt-3'>
                  {renderTrainFields()}
                </div>
                <Button variant="primary" onClick={handleTrainSearch}>
                  Search Trains
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey='metro' title='Metro'>
            <Row>
              <Col>
                Refill your Metro Card
                <div className='mt-3'>
                  {renderMetroFields()}
                </div>
                <Button variant="primary" onClick={handleMetroSearch}>
                  Search Metro
                </Button>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </header>
      <footer>
  <p>&copy; 2023 TransitHub. All rights reserved.</p>
  </footer>
    </div>
  );
}

export default Trans;
