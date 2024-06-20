import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const QuestionList = ({ questions }) => {
  return (
    <List>
      {questions.map((question) => (
        <ListItem key={question.id}>
          <ListItemText primary={question.text} />
          <List>
            {question.options.map((option) => (
              <ListItem key={option.id}>
                <ListItemText primary={option.text} secondary={option.isCorrect ? 'Correct' : 'Incorrect'} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionList;
