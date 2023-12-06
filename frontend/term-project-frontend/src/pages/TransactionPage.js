import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import './Trans.css';
import Metro_ABI from './../utils/Metro_ABI.json'
import axios from 'axios';
import {ethers} from 'ethers';
import FlightTicket from'./../utils/FlightTicket.json';


const contractAddress = "0x09577c27B11886b90C3908B9B8665a51aD8fEA9B"; // Replace with your actual contract address
const contractABI = FlightTicket.abi;


function Ticket({ ticket, onBuyClick }) {
  const [isHovered, setIsHovered] = useState(false);
  

 
  return (
    <div
      className="ticket"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{ticket.class}: ETH {ticket.price}</h2>
      <p>
        Departing from: {ticket.departingFrom}, Returning to: {ticket.returningTo}
      </p>
      <p>
        Departure date: {ticket.departingDate.toLocaleDateString()},{' '}
        Returning date: {ticket.returningDate.toLocaleDateString()}
      </p>
      {isHovered && (
        <Button variant="success" onClick={onBuyClick}>
          Buy
        </Button>
      )}
    </div>
  );
}

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
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [ticketPrices, setTicketPrices] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getPrice = () => {
    return axios
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2M6AYX86W1KF1V9KRMBHQEQ5U1BFGQ7D5S')
      .then((res) => {
        return res.data.result.ethusd;
      });
  };

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };

    fetchEthPrice();
  }, []);

useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };

    fetchEthPrice();
  }, []);

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
      <Form.Group controlId="departingFromTrain">
        <Form.Control
          type="text"
          placeholder="From"
          value={departingFrom}
          onChange={(e) => setDepartingFrom(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="returningToTrain">
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
          <Form.Group controlId="tripTypeTrain">
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
          <Form.Group controlId="departingDateTrain">
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
            <Form.Group controlId="returningDateTrain">
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
          <Form.Group controlId="numPassengersTrain">
            <Form.Label>Number of Passengers:</Form.Label>
            <Form.Control
              type="number"
              value={numPassengers}
              onChange={(e) => setNumPassengers(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="classTypeTrain">
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
  

 
  const handleFlightSearch = async () => {
    try {
      // Fetch the current Ethereum to USD exchange rate from CoinGecko API
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      const ethPrice = response.data.ethereum.usd;
  
      // Simulate API call to fetch ticket prices (replace with your actual API call)
      // For demonstration purposes, generate random prices
      const simulatedTicketPrices = [
        { class: 'Economy', price: 50 },
        { class: 'Business', price: 60 },
        { class: 'First Class', price:70 },
      ];
  
      // Convert ticket prices to Ethereum
      const ticketPricesInEth = simulatedTicketPrices.map((ticket) => ({
        ...ticket,
        price: parseFloat(ticket.price / ethPrice).toFixed(4), // Convert to Ethereum and round to 4 decimal places
      }));
      console.log('ethPrice:', ethPrice);
console.log('ticketPricesInEth:', ticketPricesInEth);


  
      // Select a random ticket for demonstration
      const randomTicketIndex = Math.floor(Math.random() * ticketPricesInEth.length);
      const selectedTicket = ticketPricesInEth[randomTicketIndex];
  
      // Set the correct classType for the selected ticket
      const classType = selectedTicket.class.toLowerCase();

      if (classType !== undefined) {
        // Use classType in your transaction
        setClassType(classType);
      } else {
        console.error('Invalid or undefined class type in selectedTicket');
        // Handle the error or inform the user
      }
      // Store the selected ticket in the state
      setTicket({
        ...selectedTicket,
        departingFrom,
        returningTo,
        departingDate,
        returningDate,
        numTravelers,
        classType, // Use the correct classType here
      });
  
      // Store the converted ticket prices in the state
      setTicketPrices(ticketPricesInEth);
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have an ETH wallet!");
        return;
      }

      // Pulls array of accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);

        // Perform additional actions after successful connection
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const numTickets = await contract.ticketCount();
        const ticketDetails = [];
           for (let i = 0; i < numTickets; i++) {
           const ticket = await contract.getTicketDetails(i);
     ticketDetails.push(ticket);
       }
        setTransactions(ticketDetails);
        loadPurchasedTickets();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Need an ETH wallet to connect to!");
        return;
      }

      // Makes request to connect to ETH account (Metamask wallet)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      // Set the currAccount state within this component to know the address of the account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyFlightTicket = async () => {
    try {
      const { ethereum } = window;
  
      // Ensure that there is a connected Ethereum account
      if (!currentAccount) {
        console.error('No connected Ethereum account');
        // You might want to provide user feedback here
        return;
      }
  
      console.log('Current Account:', currentAccount);
  
      // Initialize your Plane contract
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      
  const classType = "Economy";
  console.log('Class Type:', classType);
  

  const ticketPrice = await contract.calculateTicketPrice(classType, numTravelers);
  const ticketPriceInEther = ticket.price;
  const ticketPriceInWei = ethers.utils.parseEther(Number(ticketPriceInEther).toString());

  console.log('Ticket Price (Wei):', ticketPrice.toString());
  

      // Perform the ticket purchase
      const purchaseTx = await contract.purchaseTicket(
        departingFrom,
        returningTo,
        departingDate.getTime(),
        returningDate.getTime(),
        numTravelers,
        classType,
        { value: ticketPriceInWei }
      );
        console.log('Purchase Transaction:', purchaseTx);

        await purchaseTx.wait();
    
        console.log('Transaction Mined');
    
      
  
      if (purchaseTx && purchaseTx.events && purchaseTx.events.length > 0) {
        const latestTicketId = purchaseTx.events[0].args.ticketId.toNumber();
  
        // Assuming you have an array named 'purchasedTickets'
        const purchasedTickets = await contract.getPurchasedTickets(); // You need a function to fetch purchased tickets
  
        // Check if the array is not empty before accessing elements
        if (purchasedTickets.length > 0) {
          const latestTicket = purchasedTickets[purchasedTickets.length - 1]; // Accessing the latest ticket
          const latestTicketId = latestTicket.ticketId; // Assuming there is a 'ticketId' property
  
          // Make sure 'latestTicketId' is defined before fetching ticket details
          if (latestTicketId) {
            const ticketDetails = await contract.getTicketDetails(latestTicketId);
            console.log('Latest Ticket Details:', ticketDetails);
          } else {
            console.error('Latest ticket ID is undefined');
          }
        } else {
          console.error('No purchased tickets available');
        }
      } else {
        console.error('No events found in purchase transaction or events array is undefined.');
      }
      
    } catch (error) {
      console.error('Error purchasing flight ticket:', error);
    }
  };
  
  const loadPurchasedTickets = async () => {
    try {
      // Initialize your Plane contract
     
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, FlightTicket, signer);
      // Fetch the number of purchased tickets
      const numTickets = await contract.getNumPurchasedTickets();

      // Fetch details of each purchased ticket
      const tickets = [];
      for (let i = 0; i < numTickets; i++) {
        const ticket = await contract.getPurchasedTicketDetails(i);
        tickets.push(ticket);
      }

      // Update the state with the purchased tickets
      setPurchasedTickets(purchasedTickets);
    } catch (error) {
      console.error('Error loading purchased tickets:', error);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
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

                
                {ticket && (
                  <Ticket
                    ticket={ticket}
                    onBuyClick={handleBuyFlightTicket}
                  />
                )}


               <div>
                  <h2>Purchased Tickets</h2>
                  <ul>
                    {purchasedTickets.map((ticket, index) => (
                      <li key={index}>
                        <p>Departing From: {ticket.departingFrom}</p>
                        <p>Returning To: {ticket.returningTo}</p>
                        <p>Departing Date: {ticket.departingDate.toString()}</p>
                        <p>Returning Date: {ticket.returningDate.toString()}</p>
                        <p>Number of Travelers: {ticket.numTravelers.toString()}</p>
                        <p>Class Type: {ticket.classType.toString()}</p>
                        <p>Price: {ticket.price.toString()}</p>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
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