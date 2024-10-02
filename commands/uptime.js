let startTime = Date.now(); // Store the start time when the bot is launched

module.exports = {
    name: 'uptime',
    description: 'Displays how long the bot has been running.',
    execute(message) {
        const uptime = Date.now() - startTime; // Calculate the uptime in milliseconds
        
        // Convert uptime to a more readable format (hours, minutes, seconds)
        const totalSeconds = Math.floor(uptime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Create a response message
        const uptimeMessage = `⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s`;

        // Reply with the uptime
        message.reply(uptimeMessage);
    },
};
