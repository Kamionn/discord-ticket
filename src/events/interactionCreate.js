const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (!interaction.isStringSelectMenu() && !interaction.isButton()) return;

    const ticket = Array.from(client.tickets.values()).find(t => t.channelId === interaction.channel.id);
    if (!ticket) return;

    if (interaction.isStringSelectMenu() && interaction.customId === 'category_select') {
      const categoryName = interaction.values[0];
      const category = interaction.guild.channels.cache.find(
        c => c.name.toLowerCase() === categoryName && c.type === 4
      );
      if (category) {
        interaction.channel.setParent(category.id);
        interaction.reply({ content: `Ticket déplacé dans la catégorie **${categoryName}**.`, ephemeral: true });
      } else {
        interaction.reply({ content: `Catégorie **${categoryName}** introuvable.`, ephemeral: true });
      }
    }

    if (interaction.isButton() && interaction.customId === 'close_ticket') {
      const ticketData = client.tickets.get(ticket.userId);
      if (!ticketData) return;

      const logText = ticketData.messages.map(m => `[${m.from}] ${m.content}`).join('\n');
      const logJson = JSON.stringify(ticketData, null, 2);

      const logsDir = path.join(__dirname, '../logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      // Correction ici : utiliser ticket.userId pour le nom du fichier
      fs.writeFileSync(path.join(logsDir, `ticket-${ticket.userId}.txt`), logText);
      fs.writeFileSync(path.join(logsDir, `ticket-${ticket.userId}.json`), logJson);

      const logChannelId = process.env.LOG_CHANNEL_ID;
      if (logChannelId) {
        const logChannel = interaction.guild.channels.cache.get(logChannelId);
        if (logChannel) {
          logChannel.send({
            content: `Ticket fermé : ${interaction.channel.name}`,
            files: [
              { attachment: Buffer.from(logText), name: `ticket-${ticket.userId}.txt` },
              { attachment: Buffer.from(logJson), name: `ticket-${ticket.userId}.json` }
            ]
          });
        }
      }

      client.tickets.delete(ticket.userId);
      interaction.channel.delete();
    }
  }
};