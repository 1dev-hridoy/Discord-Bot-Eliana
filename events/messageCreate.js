const { ref, set, get } = require('firebase/database');

module.exports = {
  name: 'messageCreate',
  async execute(message, client, db) {
    if (message.author.bot) return; // Ignore bot messages

    // Command prefix
    const prefix = client.config.prefix;

    // Check for the non-prefixed command 'prefix'
    if (message.content.toLowerCase() === 'prefix') {
      await message.reply(`My prefix is **${prefix}**`);
      return; // Exit the function after responding to the non-prefixed command
    }

    // Check if message starts with the command prefix
    if (!message.content.startsWith(prefix)) return;

    // Extract command name and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the command exists
    const command = client.commands.get(commandName);
    if (command) {
      try {
        // Pass message, args, client, db, and rank functions to the command's execute function
        await command.execute(message, args, client, db);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        message.reply('There was an error trying to execute that command!');
      }
    }

    // Update user rank on message
    await updateUserRank(message.guild.id, message.author.id, client, db);

    // Update user economy (e.g., give currency)
    await updateUserBalance(message.guild.id, message.author.id, 1, db); // Give 1 currency
  },
};

// Function to get user rank and message count
async function getUserRank(guildId, userId, db) {
  const userRef = ref(db, `ranks/${guildId}/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return { rank: "New Member", messageCount: 0 }; // Default values
  }
}

// Function to update user rank and message count
async function updateUserRank(guildId, userId, client, db) {
  const userRank = await getUserRank(guildId, userId, db);
  const newMessageCount = userRank.messageCount + 1; // Increment message count

  // Update rank based on message count
  let newRank;
  if (newMessageCount < 5) {
    newRank = "New Member";
  } else if (newMessageCount < 20) {
    newRank = "Member";
  } else if (newMessageCount < 50) {
    newRank = "Regular";
  } else {
    newRank = "Veteran";
  }

  // Save updated rank and message count to Firebase
  await set(ref(db, `ranks/${guildId}/${userId}`), {
    username: client.users.cache.get(userId).username,
    rank: newRank,
    messageCount: newMessageCount,
  });
}

// Function to get user economy data
async function getUserEconomy(guildId, userId, db) {
  const userRef = ref(db, `economy/${guildId}/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return { balance: 0 }; // Default balance
  }
}

// Function to update user balance
async function updateUserBalance(guildId, userId, amount, db) {
  const userEconomy = await getUserEconomy(guildId, userId, db);
  const newBalance = userEconomy.balance + amount; // Add amount to balance

  // Save updated balance to Firebase
  await set(ref(db, `economy/${guildId}/${userId}`), {
    balance: newBalance,
  });
}
