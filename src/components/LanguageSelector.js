import React from 'react';
import Form from 'react-bootstrap/Form';

const LanguageSelector = ({ label, languages, onSelect }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" onChange={(e) => onSelect(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default LanguageSelector;
