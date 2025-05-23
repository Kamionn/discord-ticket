module.exports = async function getUserInfo(client, userId) {
    try {
        const guild = await client.guilds.fetch(process.env.USER_GUILD_ID);
        const member = await guild.members.fetch(userId);

        const joinedAt = member.joinedAt?.toLocaleDateString('fr-FR') || '❓';
        const createdAt = member.user.createdAt?.toLocaleDateString('fr-FR') || '❓';

        const roles = member.roles.cache
            .filter(r => r.name !== '@everyone')
            .map(r => r.name)
            .join(', ') || 'Aucun rôle';

        return `👤 **${member.user.tag}**\n🆔 ${member.id}\n📅 Créé le : ${createdAt}\n📥 Rejoint : ${joinedAt}\n🏷️ Rôles : ${roles}`;
    } catch (err) {
        console.error("Erreur getUserInfo :", err);
        return `Impossible de récupérer les infos pour l'utilisateur ${userId}`;
    }
};