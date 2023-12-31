
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import connectToMetaMask from "../../Connection/connectWallet";
import Button from 'react-bootstrap/Button';
import './NavbarStyles.css';


const NavBar = () => {
  const navigate = useNavigate();  
  const [searchTerm, setSearchTerm] = useState("");

  const handleMetaMaskLink = async () => {
    await connectToMetaMask();
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    console.log("Search term:", searchTerm);

    if (searchTerm === "Guide") {
      console.log("Navigating to Guide");
      navigate("/");
    } else if (searchTerm === "Buy Tickets") {
      console.log("Navigating to Buy Tickets");
      navigate("/TransactionPage");
    } else if (searchTerm === "Send Money") {
      console.log("Navigating to Send Money");
      navigate("/SendMoney");
    } 
    else if (searchTerm === "About Us") {
      console.log("Navigating to Send Money");
      navigate("/About");
    }
    else if (searchTerm === "Contact") {
      console.log("Navigating to Send Money");
      navigate("/Contact");
    }
  else {
      console.log("No match found");
    }
  };

  return (
    <>
       <Navbar className="App custom-navbar fixed-top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ETH Transit Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Guide</Nav.Link>
              <Nav.Link href="/About">About</Nav.Link>
              <Nav.Link href="/TransactionPage">Buy Tickets</Nav.Link>
              <Nav.Link href="/SendMoney">Send Money</Nav.Link>
              <Nav.Link href="/Contact">Contact</Nav.Link>
              <Nav.Link href="/Chatbot">Ask AI</Nav.Link>
            </Nav>
            <Form className="form-inline my-2 my-lg-0 ml-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-success" type="submit" onClick={handleSearch}style={{ marginTop: '8px' }} >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
