const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
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

client.on('messageCreate', async (message) => {
  if (message.content === '!문의버튼') {
    const createButton = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('create_private_channel')
          .setLabel('디코 문의하기')
          .setStyle('PRIMARY')
      );

    await message.channel.send({ content: '문의하기 버튼입니다.', components: [createButton] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const user = interaction.user;
  const guild = interaction.guild;

  if (interaction.customId === 'create_private_channel') {
    const channel = await guild.channels.create(`문의-${user.username}`, {
      type: 'GUILD_TEXT',
      permissionOverwrites: [
        {
          id: user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
        },
        {
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL']
        }
      ]
    });

    const closeButton = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('delete_private_channel')
          .setLabel('❌')
          .setStyle('DANGER')
      );

    await channel.send({ content: '문의 채널이 생성되었습니다! 문의 채널을 닫으실려면 ❌를 누르세요.', components: [closeButton] });
    await interaction.reply({ content: '문의 채널이 생성되었습니다!', ephemeral: true });
  } else if (interaction.customId === 'delete_private_channel') {
    await interaction.channel.delete();
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
