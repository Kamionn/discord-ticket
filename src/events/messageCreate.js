const { createTicketChannel, handleStaffReply } = require('../modules/ticketManager');

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (message.author.bot) return;

    if (!message.guild) {
      createTicketChannel(client, message);
    } else {
      handleStaffReply(client, message);
    }
  }
};