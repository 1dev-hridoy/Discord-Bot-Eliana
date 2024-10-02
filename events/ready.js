const { log } = require('../utils/logger');

module.exports = {
  name: 'ready',
  execute(client) {
    log(`Logged in as ${client.user.tag}`);
  },
};
