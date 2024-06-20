import axios from 'axios';

const API_URL = 'http://localhost:5166/api';

// User Authentication
const register = (username, password) => {
  return axios.post(`${API_URL}/Auth/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/Auth/login`, { username, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    });
};

// Articles API
const getArticles = (token) => {
  return axios.get(`${API_URL}/Articles`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createArticle = (token, article) => {
  return axios.post(`${API_URL}/Articles`, article, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateArticle = (token, id, article) => {
  return axios.put(`${API_URL}/Articles/${id}`, article, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteArticle = (token, id) => {
  return axios.delete(`${API_URL}/Articles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Questions API
const getQuestions = (token) => {
  return axios.get(`${API_URL}/Questions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createQuestion = (token, question) => {
  return axios.post(`${API_URL}/Questions`, question, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateQuestion = (token, id, question) => {
  return axios.put(`${API_URL}/Questions/${id}`, question, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteQuestion = (token, id) => {
  return axios.delete(`${API_URL}/Questions/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export {
  register,
  login,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
