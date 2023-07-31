const Topic = require('../models/questionsModel');

const questionsController = {};

questionsController.getQuestions = (req, res, next) => {
  console.log('IM HERE!');
  Topic.find({})
    .then((response) => {
      // console.log(response, 'response');
      const questions = {
        SPORTS: [],
        FILM: [],
        MUSIC: [],
        TELEVISION: [],
        GEOGRAPHY: [],
      };

      response.forEach((question) => {
        // console.log('11111', question);
        if (question.category === 'Sports') {
          questions.SPORTS.push(question);
        } else if (question.category === 'Film') {
          questions.FILM.push(question);
        } else if (question.category === 'Music') {
          questions.MUSIC.push(question);
        } else if (question.category === 'Television') {
          questions.TELEVISION.push(question);
        } else if (question.category === 'Geography') {
          questions.GEOGRAPHY.push(question);
        }
      });

     
      res.locals.questions = questions;
      console.log('questions', questions);

      return next();
    })
    .catch((err) => {
      return next({
        log: 'ERROR in questionsController',
        status: 404,
        message: `ERROR in questionsController: ${err}`,
      });
    });
};

module.exports = questionsController;
