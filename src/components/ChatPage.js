import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { BiUpArrow } from 'react-icons/bi';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  const availableLanguages = [
    'English',
    'Telugu',
    'Hindi'
  ]

  return (
    <Container className="vh-100 d-flex flex-column">
      <Row className="flex-grow-1 justify-content-center mt-4">
        <Col xs={4}>
            <h2>Language Preferences</h2>
            <Form.Group className="my-3">
                <Form.Label>Speak In</Form.Label>
                <Form.Select>
                    {availableLanguages.map((option,ind) => (
                    <option value={option} key={ind}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label>Listen In</Form.Label>
                <Form.Select>
                    {availableLanguages.map((option,ind) => (
                    <option value={option} key={ind}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col xs={8} className="d-flex flex-column">
          <div
            style={{
              border: '1px solid #ccc',
              height: '600px',
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
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
