const axios = require('axios');

let currentTrivia = {}; // To store the current trivia question and correct answer

module.exports = {
  name: 'trivia',
  description: 'Get a random trivia question.',
  async execute(message) {
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple';

    try {
      const response = await axios.get(url);
      const trivia = response.data.results[0];
      currentTrivia = {
        question: trivia.question,
        correctAnswer: trivia.correct_answer,
        options: [...trivia.incorrect_answers, trivia.correct_answer],
      };

      // Shuffle options
      currentTrivia.options.sort(() => Math.random() - 0.5);

      const optionsMessage = currentTrivia.options
        .map((opt, index) => `${index + 1}: ${opt}`)
        .join('\n');

      await message.reply(`**${currentTrivia.question}**\n${optionsMessage}`);
      
      // Set up a message collector to listen for the user's response
      const filter = (response) => {
        return response.author.id === message.author.id;
      };

      const collector = message.channel.createMessageCollector({ filter, max: 1, time: 30000 });

      collector.on('collect', (response) => {
        const userAnswerIndex = parseInt(response.content) - 1;

        if (userAnswerIndex >= 0 && userAnswerIndex < currentTrivia.options.length) {
          const userAnswer = currentTrivia.options[userAnswerIndex];
          if (userAnswer === currentTrivia.correctAnswer) {
            message.channel.send(`🎉 Congratulations! You got it right! The correct answer is: **${currentTrivia.correctAnswer}**`);
          } else {
            message.channel.send(`❌ Oops! That's not correct. The correct answer is: **${currentTrivia.correctAnswer}**`);
          }
        } else {
          message.channel.send("⚠️ Please provide a valid option number.");
        }
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          message.channel.send("⏰ Time's up! Please try again.");
        }
      });

    } catch (error) {
      console.error('Error fetching trivia question:', error);
      await message.reply("Couldn't fetch a trivia question. Please try again.");
    }
  },
};
