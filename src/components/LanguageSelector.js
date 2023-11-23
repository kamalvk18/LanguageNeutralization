import React from 'react';
import Form from 'react-bootstrap/Form';

const LanguageSelector = ({ label, languages, onSelect }) => {
  const availableLanguages = [
    'English',
    'Telugu',
    'Hindi'
  ]

  return (
    <div>
      <h2>Language Preferences</h2>
      <Form.Group className="my-3">
          <Form.Label>Choose your language</Form.Label>
          <Form.Select>
              {availableLanguages.map((option,ind) => (
              <option value={option} key={ind}>{option}</option>
              ))}
          </Form.Select>
      </Form.Group>
    </div>
  );
};

export default LanguageSelector;
