const { ChannelType, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function createTicketChannel(client, message) {
  const existing = client.tickets.get(message.author.id);
  if (existing) return;

  const staffGuild = await client.guilds.fetch(process.env.STAFF_GUILD_ID);
  const category = staffGuild.channels.cache.get(process.env.TICKET_CATEGORY_ID);

  const channel = await staffGuild.channels.create({
    name: `ticket-${message.author.username}-${message.author.id.slice(-4)}`,
    parent: category,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      { id: staffGuild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] }
    ]
  });

  client.tickets.set(message.author.id, {
    userId: message.author.id,
    channelId: channel.id,
    messages: [{ from: 'user', content: message.content }]
  });

  let info = `👤 **User:** ${message.author.tag} (${message.author.id})\n📆 **Created on:** ${message.author.createdAt.toLocaleDateString()}`;

  const select = new StringSelectMenuBuilder()
    .setCustomId('category_select')
    .setPlaceholder('Select a category')
    .addOptions([
      { label: 'Admin', value: 'admin' },
      { label: 'Dev', value: 'dev' },
      { label: 'Wipe', value: 'wipe' },
      { label: 'Illegal', value: 'illegal' },
      { label: 'Legal', value: 'legal' },
      { label: 'Refund', value: 'refund' },
      { label: 'Staff Complaint', value: 'staff' },
      { label: 'Support', value: 'support' }
    ]);

  const closeBtn = new ButtonBuilder()
    .setCustomId('close_ticket')
    .setLabel('Close Ticket')
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(select);
  const row2 = new ActionRowBuilder().addComponents(closeBtn);

  channel.send({ content: info });
  channel.send({ content: 'Please select a category to start the discussion.', components: [row, row2] });
  channel.send({ content: `Initial message:\n> ${message.content}` });
}

async function handleStaffReply(client, message) {
  const ticket = Array.from(client.tickets.values()).find(t => t.channelId === message.channel.id);
  if (!ticket) return;

  const user = await client.users.fetch(ticket.userId).catch(() => null);
  if (!user) return;

  const member = message.guild.members.cache.get(message.author.id);
  const grade = member.roles.highest.name;

  user.send(`[${grade}] ${member.user.username}: ${message.content}`);
  ticket.messages.push({ from: 'staff', content: message.content });
}

module.exports = { createTicketChannel, handleStaffReply };