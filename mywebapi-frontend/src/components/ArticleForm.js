import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createArticle } from '../api';

const ArticleForm = ({ onArticleCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateArticle = async () => {
    const token = localStorage.getItem('token');
    const newArticle = { title, content };
    await createArticle(token, newArticle);
    onArticleCreated();
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Content" fullWidth margin="normal" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleCreateArticle}>
        Add Article
      </Button>
    </div>
  );
};

export default ArticleForm;
