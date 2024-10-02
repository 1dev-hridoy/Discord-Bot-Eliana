module.exports = {
    name: 'prefix',
    description: 'Show the current command prefix.',
    async execute(message) {
        // Send a message with the current command prefix
        await message.reply(`My prefix is **/**`);
    },
};
