const axios = require('axios');

module.exports = {
    name: 'clown',
    description: 'Turn the mentioned user into a clown!',
    async execute(message) {
        // Check if a user is mentioned
        const mentionedUser = message.mentions.users.first();
        
        if (!mentionedUser) {
            return message.reply('❌ You need to mention someone to clown them!');
        }

        // Get the mentioned user's avatar URL
        const avatarURL = mentionedUser.displayAvatarURL({ format: 'png', size: 512 });

        try {
            // Make the API request to Popcat with the avatar URL
            const apiUrl = `https://api.popcat.xyz/clown?image=${avatarURL}`;

            // Send the image as an embedded image in response
            await message.reply({
                embeds: [{
                    title: `${mentionedUser.username} has been clowned 🤡`,
                    image: { url: apiUrl },
                    color: 0xff0000 // Optional: Set embed color
                }]
            });
        } catch (error) {
            console.error('Error generating clown image:', error.message); // Log the error
            message.reply('⚠️ Something went wrong while generating the clown image.');
        }
    },
};
