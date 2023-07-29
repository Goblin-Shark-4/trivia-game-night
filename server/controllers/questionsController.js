const Topic = require ('../models/questionsModel')

const questionsController = {};

questionsController.getQuestions = (req, res, next) => {
  Topic.find({})
    .then(questions => {
      console.log('questions', questions);
      
      res.locals.questions = questions
      return next();
    })
    .catch(err => {
      return next({
        log: 'ERROR in questionsController',
        status: 404,
        message: `ERROR in questionsController: ${err}`
      })
    })
}

module.exports = questionsController;