import axios from 'axios';

const API_URL = 'http://localhost:5166/api';

const register = (username, password) => {
  return axios.post(`${API_URL}/Auth/register`, { username, password })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error("Registration error:", error.response.data);
      } else {
        console.error("Registration error:", error.message);
      }
      throw error;
    });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/Auth/login`, { username, password })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error("Login error:", error.response.data);
      } else {
        console.error("Login error:", error.message);
      }
      throw error;
    });
};

const getArticles = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/Articles`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => response.data)
  .catch(error => {
    if (error.response) {
      console.error("Fetch articles error:", error.response.data);
    } else {
      console.error("Fetch articles error:", error.message);
    }
    throw error;
  });
};

const createArticle = (article) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/Articles`, article, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateArticle = (id, article) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/Articles/${id}`, article, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteArticle = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/Articles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const getQuestions = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/Questions`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => response.data)
  .catch(error => {
    if (error.response) {
      console.error("Fetch questions error:", error.response.data);
    } else {
      console.error("Fetch questions error:", error.message);
    }
    throw error;
  });
};

const createQuestion = (question) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/Questions`, question, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export { register, login, getArticles, createArticle, updateArticle, deleteArticle, getQuestions, createQuestion };
