const { ref, get, set } = require('firebase/database');

module.exports = {
  name: 'pay',
  description: 'Pay another user an amount of coins!',
  async execute(message, args, client, db) {
    // Check if the command has sufficient arguments
    if (args.length < 2) {
      return message.reply("Usage: !pay <user> <amount>");
    }

    const userId = message.author.id;
    const guildId = message.guild.id;
    const recipientUser = message.mentions.users.first();
    const amount = parseInt(args[1]);

    // Validate the recipient user and the amount
    if (!recipientUser || isNaN(amount) || amount <= 0) {
      return message.reply("Please mention a valid user and specify a valid amount.");
    }

    try {
      const senderRef = ref(db, `economy/${guildId}/${userId}`);
      const recipientRef = ref(db, `economy/${guildId}/${recipientUser.id}`);

      // Get sender's and recipient's data from the database
      const senderSnapshot = await get(senderRef);
      const recipientSnapshot = await get(recipientRef);

      // Ensure both users have a balance set
      if (!senderSnapshot.exists() || !recipientSnapshot.exists()) {
        return message.reply("Both users must have a balance set.");
      }

      const senderData = senderSnapshot.val();
      const recipientData = recipientSnapshot.val();

      // Check if the sender has enough balance
      if (senderData.balance < amount) {
        return message.reply("You do not have enough balance to make this payment.");
      }

      // Update balances: deduct from sender and add to recipient
      const newSenderBalance = senderData.balance - amount;
      const newRecipientBalance = recipientData.balance + amount;

      // Update the balances in the database
      await set(senderRef, {
        ...senderData,
        balance: newSenderBalance,
      });
      await set(recipientRef, {
        ...recipientData,
        balance: newRecipientBalance,
      });

      message.reply(`You paid ${amount} coins to ${recipientUser.username}.`);
    } catch (error) {
      console.error("Error processing payment:", error);
      message.reply("There was an error processing your payment.");
    }
  },
};
