const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get } = require('firebase/database');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

// Initialize Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers, // To fetch guild members
  ],
});

// Firebase Initialization
const firebaseConfig = config.firebase;
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// Attach config to client
client.config = config;

// Load Commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Load Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client, db));
}

// Function to save guild and member data to Firebase
async function saveGuildAndMembers(guild) {
  try {
    // Fetch all members of the guild
    await guild.members.fetch();

    const guildData = {
      id: guild.id,
      name: guild.name,
      members: {},
    };

    // Store member data
    guild.members.cache.forEach(member => {
      guildData.members[member.id] = {
        username: member.user.username,
        discriminator: member.user.discriminator,
        displayName: member.displayName,
        joinedAt: member.joinedAt.toISOString(),
      };
    });

    // Save the guild and member data in Firebase
    const guildRef = ref(db, `guilds/${guild.id}`);
    await set(guildRef, guildData);
    console.log(`Saved guild and member data for ${guild.name}`);
  } catch (error) {
    console.error(`Failed to save data for guild: ${guild.id}`, error);
  }
}

// Function to get user rank and message count
async function getUserRank(guildId, userId) {
  const userRef = ref(db, `ranks/${guildId}/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return { rank: "New Member", messageCount: 0 }; // Default values
  }
}

// Function to update user rank and message count
async function updateUserRank(guildId, userId) {
  const userRank = await getUserRank(guildId, userId);
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

// Event listener when the bot is ready
client.once('ready', async () => {
  console.log(`[LOG] Logged in as ${client.user.tag}`);

  // Fetch and save all guilds and their members
  client.guilds.cache.forEach(guild => {
    saveGuildAndMembers(guild);
  });
});

// Event listener for when the bot joins a new guild
client.on('guildCreate', async (guild) => {
  console.log(`Joined new guild: ${guild.name}`);
  saveGuildAndMembers(guild);
});

// Event listener for message creation
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Update user rank on message
  await updateUserRank(message.guild.id, message.author.id);
});

// Add a listener for interactionCreate to handle slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return; // Check if it's a command

  const command = client.commands.get(interaction.commandName);
  if (!command) return; // Command not found

  try {
    await command.execute(interaction, client, db);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
  }
});

// Bot Login
client.login(config.token);
