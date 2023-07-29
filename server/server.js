const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const questionsController = require('./controllers/questionsController');

app.use(express.json())

mongoose.connect('mongodb+srv://dbUserDarius:naF0xDjsXhAaOaHE@cluster0.pjxxpw9.mongodb.net/',{

    useUnifiedTopology: true,

    dbName: 'TriviaGameNight'

})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));
  
app.get('/', questionsController.getQuestions, (req, res) => {
 res.status(200).send(res.locals.questions);
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
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