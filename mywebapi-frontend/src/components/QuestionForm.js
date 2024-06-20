import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createQuestion } from '../api';

const QuestionForm = ({ onQuestionCreated }) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = options.map((option, i) => i === index ? { ...option, [key]: value } : option);
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleCreateQuestion = async () => {
    const token = localStorage.getItem('token');
    const newQuestion = { text, options };
    await createQuestion(token, newQuestion);
    onQuestionCreated();
    setText('');
    setOptions([{ text: '', isCorrect: false }]);
  };

  return (
    <div>
      <TextField label="Question" fullWidth margin="normal" value={text} onChange={(e) => setText(e.target.value)} />
      {options.map((option, index) => (
        <div key={index}>
          <TextField
            label={`Option ${index + 1}`}
            fullWidth
            margin="normal"
            value={option.text}
            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
          />
          <Button variant="contained" onClick={() => handleOptionChange(index, 'isCorrect', !option.isCorrect)}>
            {option.isCorrect ? 'Correct' : 'Incorrect'}
          </Button>
        </div>
      ))}
      <Button variant="contained" onClick={addOption}>Add Option</Button>
      <Button variant="contained" color="primary" onClick={handleCreateQuestion}>Add Question</Button>
    </div>
  );
};

export default QuestionForm;
