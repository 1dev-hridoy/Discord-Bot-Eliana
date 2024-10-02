const { ref, set, get } = require('firebase/database');

module.exports = {
  name: 'work',
  description: 'Work and earn coins!',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;
    const earnAmount = Math.floor(Math.random() * 100) + 50; // Random amount between 50 and 150
    const cooldownDuration = 3600000; // 1 hour in milliseconds

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const userWorkRef = ref(db, `work/${guildId}/${userId}`);

      // Initialize user economy data if it doesn't exist
      const economySnapshot = await get(userEconomyRef);
      if (!economySnapshot.exists()) {
        await set(userEconomyRef, { balance: 0 });
      }

      // Initialize user work data if it doesn't exist
      const workSnapshot = await get(userWorkRef);
      if (!workSnapshot.exists()) {
        await set(userWorkRef, {
          lastUsed: null,
          nextUse: null,
          usageCount: 0,
        });
      }

      const userEconomyData = (await get(userEconomyRef)).val();
      const userWorkData = (await get(userWorkRef)).val();

      // Check if user is on cooldown
      const now = Date.now();
      if (userWorkData.lastUsed && now < userWorkData.nextUse) {
        const timeRemaining = Math.ceil((userWorkData.nextUse - now) / 60000); // Convert ms to minutes
        return message.reply(`⏳ You need to wait ${timeRemaining} minute(s) before using the work command again.`);
      }

      // Update user balance and work data
      await set(userEconomyRef, {
        balance: userEconomyData.balance + earnAmount,
      });

      await set(userWorkRef, {
        lastUsed: now,
        nextUse: now + cooldownDuration, // Set the next use time
        usageCount: userWorkData.usageCount + 1, // Increment usage count
      });

      message.reply(`You worked hard and earned ${earnAmount} coins!`);
    } catch (error) {
      console.error("Error during work command:", error);
      message.reply("There was an error trying to work.");
    }
  },
};
