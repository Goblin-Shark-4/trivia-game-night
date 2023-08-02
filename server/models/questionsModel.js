const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
});

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic;
