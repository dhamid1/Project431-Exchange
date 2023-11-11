import React from "react";
//bootstrap dependencies
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
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
            <Nav.Link href="/">Login</Nav.Link>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
        </>
    );
};
export default NavBar