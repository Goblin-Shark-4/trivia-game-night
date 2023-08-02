const Topic = require('../models/questionsModel');

const questionsController = {};

questionsController.getQuestions = (req, res, next) => {
  const categories = ['Sports', 'Film', 'Television', 'Music', 'Geography'];
  const questions = {};
  // deliver questions to front-end
  Promise.all(
    // eslint-disable-next-line consistent-return
    categories.map(async (category) => {
      try {
        const easy = await Topic.aggregate([
          { $match: { category, difficulty: 'easy' } },
          { $sample: { size: 2 } },
        ]);
        const medium = await Topic.aggregate([
          { $match: { category, difficulty: 'medium' } },
          { $sample: { size: 2 } },
        ]);
        const high = await Topic.aggregate([
          { $match: { category, difficulty: 'hard' } },
          { $sample: { size: 1 } },
        ]);
        questions[category] = [...easy, ...medium, ...high];
      } catch (err) {
        return next({
          log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
        });
      }
    }),
  )
    .then(() => {
      res.locals.questions = questions;
      return next();
    })
    .catch((err) => next({
      log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
    }));
};

module.exports = questionsController;
