const { ref, get, set } = require('firebase/database');

module.exports = {
  name: 'mystery',
  description: 'Buy a Mystery Box for 100 coins with a chance to win 200 coins or nothing.',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;

    const itemPrice = 100;

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.balance < itemPrice) {
          return message.reply("You do not have enough balance to buy the Mystery Box.");
        }

        const newBalance = userData.balance - itemPrice;

        // Update the user's balance in the database
        await set(userEconomyRef, {
          ...userData,
          balance: newBalance,
        });

        // Determine the outcome of the Mystery Box
        const outcome = Math.random() < 0.5 ? 200 : 0; // 50% chance to win 200 coins

        if (outcome > 0) {
          const finalBalance = newBalance + outcome;
          await set(userEconomyRef, {
            ...userData,
            balance: finalBalance,
          });
          message.reply(`You opened the Mystery Box and found ${outcome} coins! Your new balance is: ${finalBalance}`);
        } else {
          message.reply("You opened the Mystery Box but found nothing. Better luck next time! Your balance is: " + newBalance);
        }
      } else {
        message.reply("You do not have a balance set yet.");
      }
    } catch (error) {
      console.error("Error in shop:", error);
      message.reply("There was an error processing your purchase.");
    }
  },
};
