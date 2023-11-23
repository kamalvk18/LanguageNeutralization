import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation,useNavigate} from "react-router-dom";
import Options from './Options';

const HomePage = ({ history }) => {
  const navigate=useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionType) => {
    setSelectedOption(optionType);
    if (optionType === 'Chat') {
      navigate('/chat');
    }
  };

  return (
    <Container className="text-center">
      <h1 className="my-4">Language Neutralizer</h1>
        <Row className="d-flex justify-content-center">
            <Options optionType="Chat" onOptionClick={handleOptionClick} />
            <Options optionType="Call" onOptionClick={handleOptionClick} />
        </Row>
      {selectedOption && <p className="mt-4">Selected Option: {selectedOption}</p>}
    </Container>
  );
};

export default HomePage;
