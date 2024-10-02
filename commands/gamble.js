const { ref, get, set } = require('firebase/database');

module.exports = {
  name: 'gamble',
  description: 'Gamble a specified amount of your balance for a chance to win or lose. (50% chance)',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply("Please specify a valid amount to gamble.");
    }

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.balance < amount) {
          return message.reply("You do not have enough balance to gamble that amount.");
        }

        const win = Math.random() < 0.5; // 50% chance to win
        const newBalance = win ? userData.balance + amount : userData.balance - amount;

        // Update the user's balance in the database
        await set(userEconomyRef, {
          ...userData,
          balance: newBalance,
        });

        message.reply(`You ${win ? 'won' : 'lost'}! Your new balance is: ${newBalance}`);
      } else {
        message.reply("You do not have a balance set yet.");
      }
    } catch (error) {
      console.error("Error gambling:", error);
      message.reply("There was an error processing your gamble.");
    }
  },
};
