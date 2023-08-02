const Topic = require('../models/questionsModel');
const fetch = require('node-fetch');

const questionsController = {};

// deliver questions to front-end
questionsController.getQuestions = async (req, res, next) => {
  //Choose five unique categories randomly out of API call for categories
  let apiCategories = await fetch('https://opentdb.com/api_category.php', {
    headers: {
        'Content-Type':
        'application/json'
    },
  })
  apiCategories = await apiCategories.json();
  apiCategories = apiCategories.trivia_categories; //array of category objects

  const categories = [];
  
  for (let i = 0; i < 5; i++) {
    let ranNum = Math.floor(Math.random() * apiCategories.length);
    categories.push(apiCategories.splice(ranNum, 1)[0])
  }

  console.log('categories: ', categories);
  
  const questions = {};

//For each category, we get 2 easy, 2 medium, 1 hard-
// Need id for api call, Need name for setting key of questions
 Promise.all(
  categories.map(async (category) => {
    try {
       let easy = await fetch(`https://opentdb.com/api.php?amount=2&category=${category.id}&difficulty=easy&type=multiple`, {
         headers: {
           'Content-Type': 'application/json'
         },
       });
       easy = await easy.json();
       easy = easy.results;

       let medium = await fetch(`https://opentdb.com/api.php?amount=2&category=${category.id}&difficulty=medium&type=multiple`, {
         headers: {
           'Content-Type': 'application/json'
         },
       });
       medium = await medium.json();
       medium = medium.results;

       let hard = await fetch(`https://opentdb.com/api.php?amount=1&category=${category.id}&difficulty=hard&type=multiple`, {
         headers: {
           'Content-Type': 'application/json'
         },
       });
       hard = await hard.json();
       hard = hard.results;

       questions[category.name] = [...easy, ...medium, ...hard];
    } catch (err) {
       return next({
         log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
       });
    }
  })
)
    .then(() => {
      res.locals.questions = questions;
      return next();
    })
    .catch((err) =>
    next({
      log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
    }))
}

module.exports = questionsController;

