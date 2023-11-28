import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import { BsPerson } from 'react-icons/bs';
import { BiUpArrow, BiPhoneCall } from 'react-icons/bi';
import socketIOClient from "socket.io-client";

const socketio = socketIOClient.connect('http://localhost:5000'); 
const ChatPage = () => {
  const navigate=useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [language, setLanguage] = useState('english')

  useEffect(() => {
    // Listen for existing chat messages
    socketio.on('chat messages', async (chat) => {
      if (chat.sender !== socketio.id){
        try{
          const encodedText = encodeURIComponent(chat.text);
          const url = `http://localhost:5000/runPy?text=${encodedText}&src=${chat.lang}&dest=${language}`
          const response = await fetch(url)
          const result = await response.json()
          console.log(`converted from ${chat.text} to ${result.output}`)
          chat.text = result.output
        } catch(err){
          console.error('Error fetching data:', err)
        }
      }
      setMessages(prevMessages => [...prevMessages, chat]);
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
          sender: socketio.id,
          lang: language,
        };
  
        // Emit the message to the server

        socketio.emit('chat messages', message);
  
        // Clear the input field
        setNewMessage('');
      }
    };

  const availableLanguages = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'azerbaijani', 'basque', 'belarusian', 'bengali', 'bosnian', 'bulgarian', 'catalan', 'cebuano', 'chichewa', 'chinese (simplified)', 'chinese (traditional)', 'corsican', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto', 'estonian', 'filipino', 'finnish', 'french', 'frisian', 'galician', 'georgian', 'german', 'greek', 'gujarati', 'haitian creole', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong', 'hungarian', 'icelandic', 'igbo', 'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer', 'korean', 'kurdish (kurmanji)', 'kyrgyz', 'lao', 'latin', 'latvian', 'lithuanian', 'luxembourgish', 'macedonian', 'malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi', 'mongolian', 'myanmar (burmese)', 'nepali', 'norwegian', 'odia', 'pashto', 'persian', 'polish', 'portuguese', 'punjabi', 'romanian', 'russian', 'samoan', 'scots gaelic', 'serbian', 'sesotho', 'shona', 'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish', 'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'uyghur', 'uzbek', 'vietnamese', 'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu']
  
  return (
    <Container className="vh-100 d-flex flex-column">
      <Row className="flex-grow-1 justify-content-center mt-4">
        <Col xs={4}>
            <h2>Language Preferences</h2>
            <Form.Group className="my-3">
                <Form.Label>Choose your language</Form.Label>
                <Form.Select value={language} onChange={e=>setLanguage(e.target.value)}>
                    {availableLanguages.map((option,ind) => (
                    <option value={option} key={ind}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
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
                }}
            >
                {messages.map((message, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5px',
                        flexDirection: message.sender === socketio.id ? 'row-reverse' : 'row',
                        }}
                    >
                        <div
                        style={{
                            background: '#f0f0f0',
                            padding: '7px',
                            borderRadius: '50%',
                            marginLeft: message.sender === socketio.id ? '8px' : '0',
                            marginRight: message.sender === socketio.id ? '0' : '8px',
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
