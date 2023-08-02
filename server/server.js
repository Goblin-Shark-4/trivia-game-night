// require modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// connect to MongoDB server
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    dbName: 'TriviaGameNight',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// import controllers
const questionsController = require('./controllers/questionsController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const app = express();

// global middleware
app.use(express.json());
app.use(cors());
app.use(cors({ origin: '/questions' }));
app.use(express.static(path.resolve(__dirname, '../build')));

// GET route: handle JWT
app.get('/verifyJwt', authController.verifyJwt, (req, res) =>
  res.status(200).json(res.locals.user)
);

// GET route: obtain questions from DB
app.get('/questions', questionsController.getQuestions, (req, res) =>
  res.status(200).json(res.locals.questions)
);

// POST route: login as an existing user
app.post(
  '/log-in',
  userController.verifyUser,
  authController.setJwtToken,
  (req, res) => res.status(200).json(res.locals.secret)
);

// POST route: sign up for account
app.post(
  '/sign-up',
  userController.addUser,
  authController.setJwtToken,
  (req, res) => res.status(200).json(res.locals.secret)
);

// DELETE route: delete account from database
app.delete('/delete', userController.deleteUser, (req, res) =>
  res.status(200).json(res.locals.deleteMessage)
);

// global unknown route handler
app.use((req, res) =>
  res.status(404).send(`This is not the page you're looking for...`)
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown error.',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
