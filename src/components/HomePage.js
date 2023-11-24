import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import Options from './Options';

const HomePage = () => {
  const navigate=useNavigate();

  const handleOptionClick = (optionType) => {
    if (optionType === 'connect') {
      navigate('/connect');
    }
  };

  return (
    <Container className="text-center">
      <h1 className="my-4">Language Neutralizer</h1>
      <Row className="d-flex justify-content-center">
          <Options optionType="connect" onOptionClick={handleOptionClick} />
      </Row>
      <p>Thriving to Bridge Language Gaps.</p>
    </Container>
  );
};

export default HomePage;
