import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import { BsPerson } from 'react-icons/bs';
import { BiUpArrow, BiPhoneCall } from 'react-icons/bi';
import LanguageSelector from './LanguageSelector';

const ChatPage = () => {
  const navigate=useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <Container className="vh-100 d-flex flex-column">
      <Row className="flex-grow-1 justify-content-center mt-4">
        <Col xs={4}>
            <LanguageSelector/>
            <Button variant="primary" size='sm' onClick={()=>{navigate('/')}}>Go Back</Button>
        </Col>
        <Col xs={8} className="d-flex flex-column">
          <div
            style={{
              border: '1px solid #ccc',
              backgroundColor: 'white',
              height: '500px',
              overflowY: 'auto',
              marginBottom: '10px',
              padding: '10px',
              textAlign: 'right',
            }}
          >
            {messages.map((message, index) => (
              <div key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    marginBottom: '5px',
                  }}
                >
                  <div
                    style={{
                      background: '#f0f0f0',
                      padding: '7px',
                      borderRadius: '50%',
                      marginLeft: '8px',
                    }}
                  >
                    <BsPerson size={20} />
                  </div>
                  <div
                    style={{
                      background: '#f0f0f0',
                      padding: '8px',
                      borderRadius: '8px',
                      position: 'relative',
                    }}
                  >
                    {message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Form onSubmit={handleSendMessage}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" variant="light" style={{marginLeft: '5px'}}>
                <BiUpArrow size={20} />
              </Button>
              <Button variant="light" style={{marginLeft: '5px'}} onClick={()=>alert('Calling...')}>
                <BiPhoneCall size={20} />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
