const { ref, set, get } = require('firebase/database');
const { admins, owners } = require('../config.json'); // Importing admin and owner lists

module.exports = {
  name: 'manageadmin',
  description: 'Add or remove an admin.',
  async execute(message, args, client, db) {
    // Check if the user is an admin
    if (!admins.includes(message.author.id)) {
      return message.reply("❌ You do not have permission to use this command.");
    }

    // Check if the correct arguments are provided
    if (args.length < 2) {
      return message.reply("⚠️ Usage: `!manageadmin add/remove @User`");
    }

    const action = args[0].toLowerCase();
    const mentionedUser = message.mentions.users.first();

    // Validate the mentioned user
    if (!mentionedUser) {
      return message.reply("⚠️ Please mention a valid user.");
    }

    const userId = mentionedUser.id;

    try {
      if (action === 'add') {
        // Check if the user is already an admin
        if (admins.includes(userId)) {
          return message.reply("⚠️ This user is already an admin.");
        }

        // Add the user to the admin list
        admins.push(userId);
        await updateConfigFile({ admins });

        message.reply(`✅ ${mentionedUser.username} has been added as an admin.`);
      } else if (action === 'remove') {
        // Check if the user is an owner
        if (owners.includes(userId)) {
          return message.reply("⚠️ You cannot remove an owner.");
        }

        // Check if the user is an admin
        if (!admins.includes(userId)) {
          return message.reply("⚠️ This user is not an admin.");
        }

        // Remove the user from the admin list
        const index = admins.indexOf(userId);
        if (index > -1) {
          admins.splice(index, 1);
          await updateConfigFile({ admins });
          message.reply(`✅ ${mentionedUser.username} has been removed from admin.`);
        }
      } else {
        return message.reply("⚠️ Invalid action. Use `add` or `remove`.");
      }
    } catch (error) {
      console.error("Error managing admins:", error);
      message.reply("⚠️ There was an error trying to manage the admins.");
    }
  },
};

// Helper function to update the config file
async function updateConfigFile(newConfig) {
  // Use fs to update the config.json file
  const fs = require('fs-extra');
  const path = require('path');

  const configPath = path.join(__dirname, '../config.json');
  const configData = await fs.readJson(configPath);
  await fs.writeJson(configPath, { ...configData, ...newConfig }, { spaces: 2 });
}
