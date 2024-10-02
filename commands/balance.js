const { ref, get } = require('firebase/database');

module.exports = {
  name: 'balance',
  description: 'See you balance!',
  async execute(message, args, client, db) {
    if (!message || !message.author) {
      return message.reply("An error occurred: Unable to retrieve your information.");
    }

    const guildId = message.guild.id;

    // Check if a user is mentioned
    const mentionedUser = message.mentions.users.first();
    const userId = mentionedUser ? mentionedUser.id : message.author.id; // Use mentioned user's ID or the command author's ID

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const username = mentionedUser ? mentionedUser.username : message.author.username;
        message.reply(`**${username}'s** current balance is: ${userData.balance}`);
      } else {
        const username = mentionedUser ? mentionedUser.username : message.author.username;
        message.reply(`**${username}** does not have a balance set yet.`);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      message.reply("There was an error fetching the balance.");
    }
  },
};
