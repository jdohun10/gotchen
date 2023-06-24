

const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

const channelsByUser = new Map(); // 사용자 ID로 채널을 저장할 Map 객체 생성

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId == '!request') {
        // 버튼을 누른 사용자 찾기
        const user = interaction.user;

        // 봇이 새 비공개 채널 만들기 및 URL 생성
        const channel = await user.createDM();
        const url = `https://discord.com/channels/${interaction.guildId}/${interaction.channelId}`;

        // 채널을 저장하고, 사용자와 URL 공유
        channelsByUser.set(user.id, channel);
        const embed = new MessageEmbed()
          .setTitle('뤼튼 의뢰 채널이 생성되었습니다.')
          .setDescription(`곧 뤼튼 담당자가 응대하러 올게요!.\n이곳 ${url} 에서 채널을 확인할 수 있습니다!`)
          .setColor('#F8BBD0'); // 알맞은 컬러값 입력

        // 버튼 생성
        const button = new MessageButton()
          .setCustomId('!request')
          .setLabel('의뢰하기')
          .setStyle('PRIMARY');

        // MessageActionRow 객체 생성
        const row = new MessageActionRow().addComponents(button);

        // 메시지 전송
        await channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

client.on('messageCreate', message => {
  if (message.content === '!request') {
    const embed = new MessageEmbed()
      .setTitle('의뢰하기')
      .setDescription('뤼튼을 사용하여 내용을 생성하려면 의뢰 문의를 해주세요!')
      .setColor('#F8BBD0');

    const button = new MessageButton()
      .setCustomId('!request')
      .setLabel('의뢰하기')
      .setStyle('PRIMARY');

    const row = new MessageActionRow().addComponents(button);

    message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8"); 
