import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

function Trans() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [tripType, setTripType] = useState('one-way');
  const [departingFrom, setDepartingFrom] = useState('');
  const [departingDate, setDepartingDate] = useState(new Date());
  const [numTravelers, setNumTravelers] = useState(1);
  const [classType, setClassType] = useState('economy');

  return (
    <div>
      <header>
        <Row>
          <Col className='text-nowrap'>Buy Tickets</Col>
        </Row>
        <Row>
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
                    <Form.Check
                      type="checkbox"
                      label="One Way"
                      checked={tripType === 'one-way'}
                      onChange={() => setTripType('one-way')}
                      className='mr-3'
                    />
                  </div>
                </Col>
                {tripType === 'one-way' && (
                  <Col>
                    <div className='mb-3'>
                      <fieldset>
                        <legend>One-Way Flight Purchase</legend>
                        {['Departing From', 'Departing Date', 'Number of Travelers', 'Class Type'].map((label, index) => (
                          <Col key={index}>
                            <Form.Group controlId={label.toLowerCase().replace(' ', '')}>
                              <Form.Label>{label}:</Form.Label>
                              {index === 1 ? (
                                <DatePicker
                                  selected={departingDate}
                                  onChange={(date) => setDepartingDate(date)}
                                  dateFormat="MM/dd/yyyy"
                                  placeholderText={`Enter ${label.toLowerCase()}`}
                                />
                              ) : index === 2 ? (
                                <Form.Control
                                  type="number"
                                  value={numTravelers}
                                  onChange={(e) => setNumTravelers(e.target.value)}
                                />
                              ) : index === 3 ? (
                                <Form.Control
                                  as="select"
                                  value={classType}
                                  onChange={(e) => setClassType(e.target.value)}
                                >
                                  <option value="economy">Economy</option>
                                  <option value="business">Business</option>
                                  <option value="first-class">First Class</option>
                                </Form.Control>
                              ) : (
                                <Form.Control
                                  type="text"
                                  placeholder={`Enter ${label.toLowerCase()}`}
                                  onChange={(e) => setDepartingFrom(e.target.value)}
                                />
                              )}
                            </Form.Group>
                          </Col>
                        ))}
                      </fieldset>
                    </div>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab eventKey='train' title='Train'>
              Train Tickets
            </Tab>
            <Tab eventKey='metro' title='Metro'>
              <Row>
                <Col>Refill your Metro Card</Col>
                <Col>{/* Add your existing logic for Metro card refill */}</Col>
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </header>
    </div>
  );
}

export default Trans;
