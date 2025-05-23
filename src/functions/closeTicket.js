const fs = require('fs');
const path = require('path');

module.exports = async function closeTicket(client, interaction, channel) {
  await interaction.reply({ content: '🔒 Closing the ticket...', ephemeral: true });

  try {
    const messages = await channel.messages.fetch({ limit: 100 });
    const logs = [...messages.values()].reverse().map(m => `[${m.createdAt.toLocaleString()}] ${m.author.tag}: ${m.content}`);

    const txtLog = logs.join('\n');
    const jsonLog = JSON.stringify(logs, null, 2);

    const timestamp = Date.now();
    const baseName = `ticket-${channel.name}-${timestamp}`;

    const txtPath = path.join(__dirname, '..', 'logs', `${baseName}.txt`);
    const jsonPath = path.join(__dirname, '..', 'logs', `${baseName}.json`);

    fs.writeFileSync(txtPath, txtLog);
    fs.writeFileSync(jsonPath, jsonLog);

    const logChannelId = process.env.LOG_CHANNEL_ID;
    if (logChannelId) {
      const logChannel = await client.channels.fetch(logChannelId);
      await logChannel.send({
        content: `📁 Ticket closed: ${channel.name}`,
        files: [txtPath, jsonPath]
      });
    }

    setTimeout(() => {
      fs.unlinkSync(txtPath);
      fs.unlinkSync(jsonPath);
    }, 3000);

    await channel.delete();
  } catch (err) {
    console.error("Error closing ticket:", err);
    interaction.channel.send('❌ An error occurred while closing the ticket.');
  }
};