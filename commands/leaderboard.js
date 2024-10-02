const { ref, get } = require('firebase/database');

module.exports = {
  name: 'leaderboard',
  description: 'Displays the top 10 users with the highest balance in the economy.',
  async execute(message, args, client, db) {
    const guildId = message.guild.id;

    try {
      const leaderboardRef = ref(db, `economy/${guildId}`);
      const snapshot = await get(leaderboardRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const sortedUsers = Object.entries(users)
          .map(([userId, userData]) => ({
            userId,
            username: client.users.cache.get(userId)?.username || 'Unknown User',
            balance: userData.balance,
          }))
          .sort((a, b) => b.balance - a.balance) // Sort by balance descending
          .slice(0, 10); // Get top 10 users

        const leaderboardMessage = sortedUsers
          .map((user, index) => `${index + 1}. ${user.username}: ${user.balance} coins`)
          .join('\n');

        message.reply(`**Leaderboard**:\n${leaderboardMessage}`);
      } else {
        message.reply("No users found in the economy.");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      message.reply("There was an error fetching the leaderboard.");
    }
  },
};
