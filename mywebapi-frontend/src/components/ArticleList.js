import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ArticleList = ({ articles }) => {
  return (
    <List>
      {articles.map((article) => (
        <ListItem key={article.id}>
          <ListItemText primary={article.title} secondary={article.content} />
        </ListItem>
      ))}
    </List>
  );
};

export default ArticleList;
