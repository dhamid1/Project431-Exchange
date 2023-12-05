<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
=======
import React from "react";
//bootstrap dependencies
>>>>>>> parent of 0e83633 (Homepage)
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const NavBar = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
=======
>>>>>>> parent of 0e83633 (Homepage)

  const handleMetaMaskLink = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("MetaMask not detected. Please install MetaMask.");
        return;
      }

      // Request account access if not already authorized
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length > 0) {
        console.log("MetaMask connected:", accounts[0]);
        // You can do additional logic after connecting, e.g., update user state
      } else {
        console.log("MetaMask connection canceled.");
      }
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  };
<<<<<<< HEAD

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
    } else {
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
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="info" onClick={handleMetaMaskLink}>Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

=======
    return(
        <>
      <Navbar className="App" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ETH Transit Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link href="/">Guide</Nav.Link>
            <Nav.Link href="/TransactionPage">Buy Tickets</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
            <Button variant="info" onclick={handleMetaMaskLink}>Login</Button>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
        </>
    );
};
export default NavBar
>>>>>>> parent of 0e83633 (Homepage)
