const Topic = require('../models/questionsModel');

const questionsController = {};

questionsController.getQuestions = (req, res, next) => {
  console.log('IM HERE!');
  Topic.find({})
    .then((response) => {
      // console.log(response, 'response');
      const questions = {
        sports: [],
        film: [],
        music: [],
        television: [],
        geography: [],
      };

      response.forEach((question) => {
        // console.log('11111', question);
        if (question.category === 'Sports') {
          questions.sports.push(question);
        } else if (question.category === 'Film') {
          questions.film.push(questions);
        } else if (question.category === 'Music') {
          questions.music.push(question);
        } else if (question.category === 'Television') {
          questions.television.push(question);
        } else if (question.category === 'Geography') {
          questions.geography.push(question);
        }
      });

      // console.log(questions, 'questions');
      res.locals.questions = questions;

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
