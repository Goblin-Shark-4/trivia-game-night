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
  //console.log('apiCategories', apiCategories);
  const categories = [];
  let ranNum = Math.floor(Math.random() * apiCategories.length);
  
  for (let i = 0; i < 5; i++) {
    categories.push(apiCategories.splice(ranNum, 1)[0])
  }

  console.log('categories: ', categories);
  
  const questions = {};

  //For each category, we get 2 easy, 2 medium, 1 hard-
  // Need id for api call, Need name for setting key of questions
 // Promise.all(
  // await categories.map(async (category) => {
  for (let i = 0; i < categories.length; i++) {
      try {
        // const easy = await Topic.aggregate([
        //   { $match: { category: category, difficulty: 'easy' } },
        //   { $sample: { size: 2 } },
        // ]);
        // const medium = await Topic.aggregate([
        //   { $match: { category: category, difficulty: 'medium' } },
        //   { $sample: { size: 2 } },
        // ]);
        // const high = await Topic.aggregate([
        //   { $match: { category: category, difficulty: 'hard' } },
        //   { $sample: { size: 1 } },
        // ]);
        let easy = await fetch(`https://opentdb.com/api.php?amount=2&category=${categories[i].id}&difficulty=easy&type=multiple`, {
          headers: {
              'Content-Type':
              'application/json'
          },
        })
        easy = await easy.json();
        easy = easy.results;
       // console.log('easy', easy);

        let medium = await fetch(`https://opentdb.com/api.php?amount=2&category=${categories[i].id}&difficulty=medium&type=multiple`, {
          headers: {
              'Content-Type':
              'application/json'
          },
        })
        medium = await medium.json();
        medium = medium.results;
       // console.log('medium', medium);

        let hard = await fetch(`https://opentdb.com/api.php?amount=1&category=${categories[i].id}&difficulty=hard&type=multiple`, {
          headers: {
              'Content-Type':
              'application/json'
          },
        })
        hard = await hard.json();
        hard = hard.results;
       // console.log('hard', hard)

        questions[categories[i].name] = [...easy, ...medium, ...hard];
        //console.log('inner questions: ', questions);
      } catch (err) {
        return next({
          log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
        });
      }
    }
    res.locals.questions = questions;
    console.log('res.locals.questions: ', res.locals.questions);
  //)
    // .then(() => {
      // res.locals.questions = questions;
      // return next();
    // })
    // .catch((err) =>
    // next({
    //   log: `Express error handler caught an error at questionsController.getQuestions: ${err}`,
    // }))
  }

module.exports = questionsController;
