import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { BiUpArrow } from 'react-icons/bi';
import socketIOClient from "socket.io-client";

const socketio = socketIOClient('http://localhost:5000'); 

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    useEffect(() => {
      // Listen for existing chat messages
      socketio.on('chat messages', (chatMessages) => {
        setMessages(chatMessages);
      });
  
      return () => {
        // Clean up the socket connection when the component is unmounted
        socketio.disconnect();
      };
    }, []);
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim() !== '') {
        const message = {
          text: newMessage,
          sender: 'user', // Identify the sender (you can use different sender names for different instances)
        };
  
        // Emit the message to the server

        socketio.emit('chat messages', [...messages ,message]);
  
        // Clear the input field
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
                    {message.text}
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
