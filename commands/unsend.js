const { Message } = require('discord.js');

module.exports = {
    name: 'unsend',
    description: 'Delete message that was replied to.',
    async execute(message, args, client) {
        // Check if the message is a reply
        if (message.reference) {
            try {
                // Fetch the message being replied to
                const referencedMessage = await message.fetchReference();

                // Check if the referenced message was sent by the bot
                if (referencedMessage.author.id === client.user.id) {
                    // Delete the referenced (replied) message
                    await referencedMessage.delete();
                    // Delete the command message (the message that invoked the command)
                    await message.delete();
                } else {
                    // If the replied message wasn't from the bot, send a response (optional)
                    await message.reply("You can only unsend messages that were sent by me!");
                }
            } catch (error) {
                console.error("Error deleting message:", error);
                // Handle error (e.g., message not found)
            }
        } else {
            // If no message is referenced, inform the user
            await message.reply("Please reply to a message that I sent to unsend it!");
        }
    },
};
