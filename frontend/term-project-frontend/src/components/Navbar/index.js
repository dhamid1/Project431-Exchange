import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
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

  return (
    <>
      <Navbar className="App" bg="light" expand="lg">
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
