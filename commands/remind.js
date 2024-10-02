module.exports = {
    name: 'remind',
    description: 'Set a reminder.',
    async execute(message, args) {
      const time = parseInt(args[0]);
      const reminderMessage = args.slice(1).join(' ');
  
      if (!time || !reminderMessage) {
        return message.reply("Please provide a time in minutes and a reminder message.");
      }
  
      const reminder = await message.reply(`Reminder set for ${time} minutes. I'll remind you!`);
      
      setTimeout(() => {
        reminder.reply(`⏰ Reminder: ${reminderMessage}`);
      }, time * 60000);
    },
  };
  