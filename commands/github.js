const axios = require('axios');

module.exports = {
    name: 'github',
    description: 'Get information about a GitHub user!',
    async execute(message, args) {
        // Check if the user provided a GitHub username
        if (args.length === 0) {
            return await message.reply("❌ Please provide a GitHub username.");
        }

        // Join the arguments to create the username string
        const username = args.join(" ");
        const apiUrl = `https://api.elianabot.xyz/tools/github.php?username=${encodeURIComponent(username)}`;

        try {
            // Fetch the GitHub user data from the API
            const response = await axios.get(apiUrl);
            const userData = response.data;

            // Construct a message with the user's information
            const userInfo = `
                **Username:** ${userData.login}
                **ID:** ${userData.id}
                **Profile URL:** [GitHub Profile](${userData.html_url})
                **Public Repos:** ${userData.public_repos}
                **Followers:** ${userData.followers}
                **Following:** ${userData.following}
                **Bio:** ${userData.bio || 'No bio available'}
                **Location:** ${userData.location || 'No location specified'}
                **Created At:** ${new Date(userData.created_at).toLocaleDateString()}
                **Updated At:** ${new Date(userData.updated_at).toLocaleDateString()}
            `;

            // Send the user's avatar and information
            await message.reply({
                content: userInfo,
                embeds: [{
                    image: {
                        url: userData.avatar_url // Use the avatar URL from the API response
                    }
                }]
            });
        } catch (error) {
            console.error('Error fetching GitHub user information:', error.message);
            return await message.reply("⚠️ An error occurred while fetching the GitHub user information. Please try again later.");
        }
    },
};
