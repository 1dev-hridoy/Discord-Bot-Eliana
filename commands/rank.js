module.exports = {
  name: 'rank',
  description: 'Displays your current rank and message count in the server.',
  async execute(message, args, client, db, getUserRank, updateUserRank) {
      const guildId = message.guild.id;
      const userId = message.author.id;

      // Fetch user rank
      const userRank = await getUserRank(guildId, userId, db);
      
      // Reply with the user's current rank
      message.reply(`Your rank is: ${userRank.rank} with ${userRank.messageCount} messages.`);
  },
};
