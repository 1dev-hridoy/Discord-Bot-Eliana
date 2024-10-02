const { ref, get } = require('firebase/database');

module.exports = {
  name: 'rankall',
  description: 'Show the top 10 user ranks!',
  async execute(message, args, client, db) {
    const guildId = message.guild.id;
    
    try {
      // Reference to the ranks data in the Firebase database
      const ranksRef = ref(db, `ranks/${guildId}`);
      const snapshot = await get(ranksRef);

      // Check if the ranks data exists
      if (!snapshot.exists()) {
        return message.reply("There are no ranks available.");
      }

      const ranksData = snapshot.val();
      const rankList = [];

      // Convert the ranks data into an array of objects
      for (const userId in ranksData) {
        rankList.push({
          userId: userId,
          ...ranksData[userId],
        });
      }

      // Sort the rank list by messageCount in descending order
      rankList.sort((a, b) => b.messageCount - a.messageCount);

      // Get the top 10 users
      const topUsers = rankList.slice(0, 10);
      const rankMessage = topUsers.map((user, index) => 
        `**#${index + 1}** - **${user.username}** - Rank: **${user.rank}** - Messages: **${user.messageCount}**`
      ).join('\n');

      // Send the rank list in a message
      message.channel.send(`**Top 10 Users:**\n${rankMessage}`);
    } catch (error) {
      console.error("Error during rankall command:", error);
      message.reply("There was an error trying to fetch the ranks.");
    }
  },
};
