import React, { useEffect, useState } from 'react';
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from '../api';
import { Container, Typography, Box, TextField, Button, IconButton, Paper, List, ListItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['']);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getQuestions(token);
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
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
      const token = localStorage.getItem('token');
      const newQuestion = { text, options: options.map(option => ({ text: option })) };
      if (editMode) {
        await updateQuestion(token, currentQuestionId, newQuestion);
      } else {
        await createQuestion(token, newQuestion);
      }
      setText('');
      setOptions(['']);
      setEditMode(false);
      setCurrentQuestionId(null);
      const response = await getQuestions(token);
      setQuestions(response.data);
    } catch (err) {
      setError(editMode ? 'Failed to update question' : 'Failed to create question');
      console.error(err);
    }
  };

  const handleEdit = (question) => {
    setText(question.text);
    setOptions(question.options.map(option => option.text));
    setEditMode(true);
    setCurrentQuestionId(question.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteQuestion(token, id);
      const response = await getQuestions(token);
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to delete question');
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
            style: { color: '#000000' }
          }}
          InputLabelProps={{
            style: { color: '#000000' }
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
                style: { color: '#000000' }
              }}
              InputLabelProps={{
                style: { color: '#000000' }
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
          {editMode ? 'Update Question' : 'Add Question'}
        </Button>
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outlined"
          sx={{
            mt: 2,
            ml: 2,
            color: '#ADD8E6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#E0FFFF',
            },
          }}
        >
          Back
        </Button>
      </Box>
      <Box>
        {questions.map(question => (
          <Paper key={question.id} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(224, 255, 255, 0.6)' }}>
            <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
              {question.text}
            </Typography>
            <List>
              {question.options.map((option, index) => (
                <ListItem key={option.id} sx={{ color: '#555', margin: '8px 0', fontWeight: 'bold', listStyleType: 'none' }}>
                  <span style={{ marginRight: '8px', backgroundColor: '#87CEEB', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    {index + 1}
                  </span>
                  <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                    {option.text}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => handleEdit(question)} sx={{ color: '#87CEEB' }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(question.id)} sx={{ color: '#F08080' }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Questions;
