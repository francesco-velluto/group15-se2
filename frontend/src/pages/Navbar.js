import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Row as={Link} to="/" className="title-navbar text-center py-3">
      <h1><strong>Office Queue Management System</strong></h1>
    </Row>
  );
};

export default Navbar;