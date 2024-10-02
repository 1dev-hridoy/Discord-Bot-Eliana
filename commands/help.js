const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js'); // Updated import

module.exports = {
    name: 'help',
    description: 'List all available commands',
    async execute(message) {
        const commandsFolder = path.join(__dirname, '..', 'commands');
        const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

        const commandList = commandFiles.map(file => {
            const command = require(path.join(commandsFolder, file));
            return { name: command.name, description: command.description, category: command.category || 'General' };
        });

        // Calculate the total number of commands
        const totalCommands = commandList.length;

        // Organize commands by category
        const categorizedCommands = commandList.reduce((acc, command) => {
            if (!acc[command.category]) {
                acc[command.category] = [];
            }
            acc[command.category].push(command);
            return acc;
        }, {});

        // Create paginated messages
        const embedPages = [];
        let pageEmbed = new EmbedBuilder()  // Updated class name
            .setColor('#0099ff')
            .setTitle('🔍 Help Command')
            .setDescription(`Here are the available commands (Total: **${totalCommands}**):`)
            .setFooter({ text: 'Use the reactions to navigate.' });

        for (const category in categorizedCommands) {
            const commandsInCategory = categorizedCommands[category]
                .map(command => `**${command.name}**: ${command.description}`)
                .join('\n');

            // Split if the command descriptions exceed 1024 characters
            if (commandsInCategory.length > 1024) {
                const chunks = splitTextIntoChunks(commandsInCategory, 1024);
                chunks.forEach((chunk, index) => {
                    pageEmbed.addFields({ name: `${category} (Part ${index + 1})`, value: chunk });
                });
            } else {
                pageEmbed.addFields({ name: category, value: commandsInCategory || 'No commands available.' });
            }

            if (pageEmbed.data.fields.length === 25) { // Limit to 25 fields per embed
                embedPages.push(pageEmbed);
                pageEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('🔍 Help Command')
                    .setDescription(`Here are the available commands (Total: **${totalCommands}**):`)
                    .setFooter({ text: 'Use the reactions to navigate.' });
            }
        }

        if (pageEmbed.data.fields.length > 0) {
            embedPages.push(pageEmbed);
        }

        // Send the first page
        const helpMessage = await message.reply({ embeds: [embedPages[0]] });

        // Add reactions for navigation
        await helpMessage.react('◀️');
        await helpMessage.react('▶️');

        let currentPage = 0;

        const filter = (reaction, user) => {
            return ['◀️', '▶️'].includes(reaction.emoji.name) && !user.bot;
        };

        const collector = helpMessage.createReactionCollector({ filter, time: 60000 });

        collector.on('collect', (reaction, user) => {
            // Remove user's reaction
            reaction.users.remove(user.id).catch(console.error);

            if (reaction.emoji.name === '▶️') {
                currentPage = (currentPage + 1) % embedPages.length; // Loop back to start
            } else if (reaction.emoji.name === '◀️') {
                currentPage = (currentPage - 1 + embedPages.length) % embedPages.length; // Loop to end
            }
            helpMessage.edit({ embeds: [embedPages[currentPage]] });
        });

        collector.on('end', () => {
            helpMessage.reactions.removeAll().catch(console.error); // Clear reactions when done
        });
    },
};

// Helper function to split long text into smaller chunks
function splitTextIntoChunks(text, chunkSize) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}
