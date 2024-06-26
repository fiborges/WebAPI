import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles, createArticle, deleteArticle, updateArticle } from '../api';
import { Container, Typography, Box, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getArticles(token);
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setError('Failed to fetch articles');
        }
      } catch (err) {
        setError('Failed to fetch articles');
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editMode) {
        const articleToUpdate = { id: currentArticle.id, title, content };
        await updateArticle(token, currentArticle.id, articleToUpdate);
        setEditMode(false);
        setCurrentArticle(null);
      } else {
        await createArticle(token, { title, content });
      }
      setTitle('');
      setContent('');
      const response = await getArticles(token);
      setArticles(response.data);
      setDialogOpen(false);
    } catch (err) {
      setError('Failed to create or update article');
      console.error(err);
    }
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setCurrentArticle(article);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteArticle(token, id);
      const response = await getArticles(token);
      setArticles(response.data);
    } catch (err) {
      setError('Failed to delete article');
      console.error(err);
    }
  };

  const handleView = (article) => {
    setCurrentArticle(article);
    setViewDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditMode(false);
    setCurrentArticle(null);
    setTitle('');
    setContent('');
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
    setCurrentArticle(null);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Articles
      </Typography>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          mb: 4,
          backgroundColor: '#ADD8E6',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#87CEEB',
          },
        }}
        onClick={() => setDialogOpen(true)}
      >
        Add Article
      </Button>
      <Box>
        {articles.map(article => (
          <Box key={article.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
            <Typography variant="h6" onClick={() => handleView(article)} sx={{ cursor: 'pointer' }}>
              {article.title}
            </Typography>
            <IconButton onClick={() => handleEdit(article)} sx={{ color: '#ADD8E6' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(article.id)} sx={{ color: '#F08080' }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editMode ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={viewDialogOpen} onClose={handleViewDialogClose}>
        <DialogTitle>{currentArticle?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentArticle?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#87CEEB',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#ADD8E6',
          },
        }}
        onClick={handleBackClick}
      >
        Back
      </Button>
    </Container>
  );
};

export default Articles;
