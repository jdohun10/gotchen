const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [ Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.content === '!createPrivateChannel') {
    // 새로운 비공개 텍스트 채널을 생성합니다.
    message.guild.channels
      .create('private-channel', {
        type: 'text',
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
      })
      .then((channel) => {
        message.reply(`비공개 채널이 생성되었습니다: ${channel}`);
      })
      .catch((error) => {
        console.error(error);
        message.reply('채널 생성 중 오류가 발생했습니다.');
      });
  }
});


client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GpuYNO.q3jDR2GrJ_asKwSeJesVUufYlfZdi1sWmDI6Z4");
