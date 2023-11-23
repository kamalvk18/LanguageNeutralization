import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { FiMessageSquare, FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Options = ({ optionType, onOptionClick }) => {
  const icon = optionType === 'connect' ? <FiPhoneCall size={40} /> : <FiMessageSquare size={40} />;

  return (
    <Col md={6}>
      <Card className="my-4" style={{ cursor: 'pointer' }} onClick={() => onOptionClick(optionType)}>
        <Link to={`/${optionType}`} className="text-decoration-none text-dark">
          <Card.Body className="text-center">
            <Card.Title>{icon}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{optionType}</Card.Subtitle>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default Options;
