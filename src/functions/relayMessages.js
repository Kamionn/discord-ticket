const relayMap = new Map(); // userId -> channelId

module.exports.enableRelay = function (userId, channelId) {
  relayMap.set(userId, channelId);
};

module.exports.disableRelay = function (userId) {
  relayMap.delete(userId);
};

module.exports.setup = function (client) {
  client.on('messageCreate', async (message) => {
    // DM user to staff channel
    if (!message.guild && !message.author.bot) {
      const channelId = relayMap.get(message.author.id);
      if (!channelId) return;

      const staffGuild = await client.guilds.fetch(process.env.STAFF_GUILD_ID);
      const channel = staffGuild.channels.cache.get(channelId);
      if (!channel) return;

      await channel.send({
        content: `📨 **${message.author.username}** : ${message.content}`
      });
    }

    // Staff to DM user
    if (message.guild && message.channel && relayMap.has([...relayMap.entries()].find(([_, v]) => v === message.channel.id)?.[0])) {
      const userId = [...relayMap.entries()].find(([_, v]) => v === message.channel.id)?.[0];
      if (!userId) return;

      const user = await client.users.fetch(userId);
      await user.send(`[STAFF] ${message.member.displayName} : ${message.content}`);
    }
  });
};