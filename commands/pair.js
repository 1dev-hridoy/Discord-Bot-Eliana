const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    name: 'pair',
    description: 'Pair yourself with a random person and see the love!',
    async execute(message) {
        const commandUserImage = message.author.displayAvatarURL({ dynamic: true, size: 1024 });
        
        // Get all members in the guild
        const members = await message.guild.members.fetch();
        
        // Filter out the command user and bots
        const filteredMembers = members.filter(member => !member.user.bot && member.id !== message.author.id);

        if (filteredMembers.size === 0) {
            return await message.reply('❌ No other users to pair with in this server.');
        }

        // Select a random member from the filtered list
        const randomMember = filteredMembers.random();
        const randomPersonImage = randomMember.user.displayAvatarURL({ dynamic: true, size: 1024 });

        // API to get the paired image
        const apiUrl = `https://api.elianabot.xyz/fun/pair.php?image1=${encodeURIComponent(commandUserImage)}&image2=${encodeURIComponent(randomPersonImage)}`;

        try {
            // Send the request to the API to get the paired image
            const response = await axios.get(apiUrl);

            // Check if the response is a valid image
            if (response.status === 200) {
                // Use the URL you constructed for the image
                const pairedImageUrl = apiUrl;

                // Generate a random love percentage
                const lovePercentage = Math.floor(Math.random() * 100) + 1; // Random percentage between 1 and 100

                // Generate a random love message
                const loveMessages = [
                    'You two are a match made in heaven!',
                    'Love is in the air!',
                    'Together, you are unstoppable!',
                    'Your love story is just beginning!',
                    'Two hearts, one love!'
                ];
                const randomLoveMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

                // Send the response with the paired image URL and love percentage
                await message.reply({
                    content: `💖 ${message.author.username} and ${randomMember.user.username}! 💖\n${randomLoveMessage}\n**Love Percentage:** ${lovePercentage}%`,
                    embeds: [{
                        image: {
                            url: pairedImageUrl // Use the API URL directly
                        }
                    }]
                });
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error fetching paired image:', error.message); // Log the error message
            await message.reply('⚠️ An error occurred while pairing. Please try again later.');
        }
    },
};
