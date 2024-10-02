const { ref, set, get } = require('firebase/database');
const { admins } = require('../config.json'); // Importing the admin list from the config file

module.exports = {
  name: 'setmoney',
  description: 'Add a specified amount to the mentioned user\'s current balance.',
  async execute(message, args, client, db) {
    // Check if the user is an admin
    if (!admins.includes(message.author.id)) {
      return message.reply("❌ You do not have permission to use this command.");
    }

    // Check if the correct arguments are provided
    if (args.length < 2) {
      return message.reply("⚠️ Please mention a user and provide the amount. Usage: `!setmoney @User amount`");
    }

    const mentionedUser = message.mentions.users.first();
    const amount = parseInt(args[1]);

    // Validate the mentioned user and amount
    if (!mentionedUser) {
      return message.reply("⚠️ Please mention a valid user.");
    }

    if (isNaN(amount) || amount < 0) {
      return message.reply("⚠️ Please provide a valid amount.");
    }

    const userId = mentionedUser.id;
    const guildId = message.guild.id;

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);

      // Initialize user economy data if it doesn't exist
      const economySnapshot = await get(userEconomyRef);
      if (!economySnapshot.exists()) {
        await set(userEconomyRef, { balance: 0 });
      }

      // Get the current balance
      const userEconomyData = (await get(userEconomyRef)).val();
      const currentBalance = userEconomyData.balance;

      // Calculate the new balance
      const newBalance = currentBalance + amount;

      // Update the user's balance
      await set(userEconomyRef, {
        balance: newBalance,
      });

      message.reply(`💰 Successfully added ${amount} coins to ${mentionedUser.username}'s balance. New balance: ${newBalance} coins.`);
    } catch (error) {
      console.error("Error updating money:", error);
      message.reply("⚠️ There was an error trying to update the money.");
    }
  },
};
