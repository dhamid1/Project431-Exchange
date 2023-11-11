import '../App.css';
import Button from 'react-bootstrap/Button';
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
            Refill your Metro Card
        </Row>
        <Row>
            <Col>
            <InputGroup className='text-nowrap'>
                <InputGroup.Text id="dcmetro">$</InputGroup.Text>
                <Form.Control
                className='w-50'
                type="text"
                placeholder="0.00"
                aria-label="refill your metro card"
                aria-describedby="dcmetro"
          />
            </InputGroup>
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