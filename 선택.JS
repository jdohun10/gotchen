const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "문의") {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('create_ticket')
            .setLabel('문의하기')
            .setStyle('PRIMARY')
        );

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('문의 생성')
        .setDescription('문의하기 버튼을 누르면 비공개 채널이 생성됩니다.');

      message.channel.send({ embeds: [embed], components: [row] });
    }
});

const createPrivateChannel = async (guild, user) => {
  return await guild.channels.create(`문의${user.username}`, {
    type: 'GUILD_TEXT',
    parent: '', // 추가로 채널을 카테고리에 배치하려면 여기에 카테고리 ID 입력
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: ["VIEW_CHANNEL"],
      },
      {
        id: user.id,
        allow: ["VIEW_CHANNEL"],
      },
    ],
  });
};

client.on('interactionCreate', async interaction => {
  if (!interaction.isMessageComponent()) return;

  if (interaction.customId === 'create_ticket') {
    await interaction.deferUpdate();
    
    const privateChannel = await createPrivateChannel(interaction.guild, interaction.user);
    await privateChannel.send(`${interaction.user}, 비공개 채널을 생성했습니다. 문의를 작성해주세요.`);
  }
});

client.login("YOUR_BOT_TOKEN");

