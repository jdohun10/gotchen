const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === '문의') {
        const supportCategory = interaction.guild.channels.cache.find((channel) => channel.type === 'GUILD_CATEGORY' && channel.name === 'Support');
        const overwrites = [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
                id: interaction.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY],
            },
        ];

        const supportChannel = await interaction.guild.channels.create(`support-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: supportCategory,
            permissionOverwrites: overwrites,
        });

        await interaction.reply(`비공개 채널이 생성되었습니다: ${supportChannel}`);
    }
});

client.on('messageCreate', async (message) => {
    if (message.content === '!support') {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('create_support_channel')
                .setLabel('문의 만들기')
                .setStyle('PRIMARY')
        );

        await message.channel.send({ content: '문의하려면 아래 버튼을 클릭하세요.', components: [row] });
    }
});
client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
