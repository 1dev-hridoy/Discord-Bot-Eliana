module.exports = {
    name: 'guessnumber',
    description: 'Guess the number between 1 and 10!',
    
    async execute(message) {
      const user = message.author;
      const randomNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
      let attempts = 3; // The number of attempts the user has
  
      message.reply(`🎮 I have selected a number between 1 and 10. You have 3 attempts to guess it. Type your guess in the chat!`);
  
      // Create a message collector to capture the user's guesses
      const filter = response => response.author.id === user.id && !isNaN(response.content); // Ensure only numbers are guessed by the user
      const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 3 }); // Collect up to 3 guesses, for 30 seconds
  
      collector.on('collect', guessMessage => {
        const userGuess = parseInt(guessMessage.content);
  
        if (userGuess === randomNumber) {
          message.channel.send(`🎉 Congratulations ${user}! You guessed the correct number: **${randomNumber}**!`);
          collector.stop('guessed');
        } else if (userGuess > randomNumber) {
          attempts--;
          message.channel.send(`❌ Too high! You have ${attempts} attempts left.`);
        } else if (userGuess < randomNumber) {
          attempts--;
          message.channel.send(`❌ Too low! You have ${attempts} attempts left.`);
        }
  
        if (attempts === 0) {
          message.channel.send(`😢 You've run out of attempts! The correct number was **${randomNumber}**.`);
          collector.stop('failed');
        }
      });
  
      collector.on('end', (collected, reason) => {
        if (reason !== 'guessed' && reason !== 'failed') {
          message.channel.send(`⏰ Time's up! The correct number was **${randomNumber}**.`);
        }
      });
    }
  };
  