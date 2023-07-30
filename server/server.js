const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const questionsController = require('./controllers/questionsController');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(cors({ origin: '/questions' }));
mongoose
  .connect(
    'mongodb+srv://dbUserDarius:naF0xDjsXhAaOaHE@cluster0.pjxxpw9.mongodb.net/',
    {
      useUnifiedTopology: true,

      dbName: 'TriviaGameNight',
    }
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/questions', questionsController.getQuestions, (req, res) => {
  console.log('Change', res.locals);
  // console.log('get questions hi', res.locals.questions);

  // //   return res.status(200).send(JSON.stringify(res.locals.questions));
  return res.status(200).json(JSON.stringify(res.locals.questions));
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log('App listening on port: ' + port);
});
