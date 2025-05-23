require('dotenv').config();

module.exports = {
  token: process.env.TOKEN,
  staffGuildId: process.env.STAFF_GUILD_ID,
  userGuildId: process.env.USER_GUILD_ID,
  ticketCategoryId: process.env.TICKET_CATEGORY_ID,
  logChannelId: process.env.LOG_CHANNEL_ID,
};