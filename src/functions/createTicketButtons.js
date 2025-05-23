const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = function createTicketButtons() {
  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('category_admin').setLabel('Admin').setStyle(ButtonStyle.Primary).setEmoji('📦'),
    new ButtonBuilder().setCustomId('category_dev').setLabel('Dev').setStyle(ButtonStyle.Primary).setEmoji('🛠️'),
    new ButtonBuilder().setCustomId('category_wipe').setLabel('Wipe').setStyle(ButtonStyle.Primary).setEmoji('🧹'),
    new ButtonBuilder().setCustomId('category_legal').setLabel('Légal').setStyle(ButtonStyle.Primary).setEmoji('⚖️')
  );

  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('category_illegal').setLabel('Illégal').setStyle(ButtonStyle.Primary).setEmoji('🚫'),
    new ButtonBuilder().setCustomId('category_remboursement').setLabel('Remboursement').setStyle(ButtonStyle.Primary).setEmoji('💰'),
    new ButtonBuilder().setCustomId('category_plainte').setLabel('Plainte Staff').setStyle(ButtonStyle.Primary).setEmoji('🧑‍⚖️'),
    new ButtonBuilder().setCustomId('category_support').setLabel('Support').setStyle(ButtonStyle.Primary).setEmoji('🎧')
  );

  const row3 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('close_ticket').setLabel('🔒 Fermer le ticket').setStyle(ButtonStyle.Danger)
  );

  return [row1, row2, row3];
};