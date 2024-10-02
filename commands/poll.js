module.exports = {
    name: 'poll',
    description: 'Create a poll with the specified question and options.',
    async execute(message, args) {
      const pollQuestion = args[0];
      const pollOptions = args.slice(1);
  
      if (!pollQuestion || pollOptions.length < 2) {
        return message.reply("Please provide a question and at least two options.");
      }
  
      const pollEmbed = {
        title: `Poll: ${pollQuestion}`,
        description: pollOptions.map((option, index) => `${index + 1}: ${option}`).join('\n'),
        footer: { text: 'React with the number corresponding to your choice!' },
      };
  
      const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
      
      // Add reactions for voting
      for (let i = 0; i < pollOptions.length; i++) {
        await pollMessage.react(`${i + 1}️⃣`);
      }
  
      const filter = (reaction, user) => {
        return !user.bot && reaction.emoji.name.match(/[1-9]️⃣/);
      };
  
      const collector = pollMessage.createReactionCollector({ filter, time: 30000 }); // 30 seconds to vote
  
      collector.on('end', collected => {
        const results = {};
        collected.forEach(reaction => {
          results[reaction.emoji.name] = reaction.count - 1; // Subtract the bot's reaction
        });
        
        const resultMessage = `Poll results:\n${Object.entries(results).map(([option, count]) => `${option}: ${count}`).join('\n')}`;
        message.channel.send(resultMessage);
      });
    },
  };
  