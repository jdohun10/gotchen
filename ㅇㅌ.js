const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const workStartTimes = new Map();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.member.permissions.has('ADMINISTRATOR')) {
        if (message.content === '!링크') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('유튜브')
                        .setLabel('유튜브')
                        .setStyle('youtube'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('디스코드')
                        .setLabel('디스코드')
                        .setStyle('DANGER'),
                );

            message.channel.send({ content: '디스코드 링크랑 유튜브 링크를 누르세요', components: [row] });
        }
    }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
