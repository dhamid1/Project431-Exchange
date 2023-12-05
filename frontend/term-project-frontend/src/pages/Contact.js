import React from 'react';
import './Contact.css'; // Import your CSS file

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <div className="contact-info">
        <p>Phone: 410-704-2000</p>
        <p>Address: 8000 York Rd, Towson, MD 21252</p>
      </div>

      <footer>
        <p>&copy; 2023 TransitHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
