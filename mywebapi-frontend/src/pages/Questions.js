import React, { useEffect, useState } from 'react';
import { getQuestions, createQuestion } from '../api';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['']);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        console.log('Questions response:', response); // Log the response
        if (Array.isArray(response)) {
          setQuestions(response);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (err) {
        setError('Failed to fetch questions');
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = { text, options: options.map(option => ({ text: option })) };
      await createQuestion(newQuestion);
      setText('');
      setOptions(['']);
      // Fetch questions again to update the list
      const response = await getQuestions();
      setQuestions(response);
    } catch (err) {
      setError('Failed to create question');
      console.error(err);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Questions
      </Typography>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Question Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputProps={{
            style: { color: '#000000' } // Cor do texto de entrada
          }}
          InputLabelProps={{
            style: { color: '#000000' } // Cor do rótulo do campo de entrada
          }}
        />
        {options.map((option, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <TextField
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              fullWidth
              margin="normal"
              InputProps={{
                style: { color: '#000000' } // Cor do texto de entrada
              }}
              InputLabelProps={{
                style: { color: '#000000' } // Cor do rótulo do campo de entrada
              }}
            />
            <Button onClick={() => removeOption(index)} sx={{ ml: 2 }}>
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addOption} sx={{ mt: 2 }}>
          Add Option
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#ADD8E6',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#87CEEB',
            },
          }}
        >
          Add Question
        </Button>
      </Box>
      <Box>
        {questions.map(question => (
          <Box key={question.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{question.text}</Typography>
            <ul>
              {question.options.map(option => (
                <li key={option.id}>{option.text}</li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Questions;
