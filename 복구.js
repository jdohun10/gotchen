const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MTExMjAxODc4OTc3NzgwOTU0OA.GveD-z.NM5UpROtw8UrdZzfwQbk_-ZF-q9h7vjj7uIZOs'; // 여기에 실제 토큰을 입력하세요.

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.content.startsWith('!복구')) {
    const args = message.content.split(' ');
    const targetNum = parseInt(args[1]);

    if (isNaN(targetNum)) {
      message.reply('올바른 숫자를 입력해 주세요.');
      return;
    }

    const guild = client.guilds.cache.get('1105040439947558944'); // 여기에 실제 서버 ID를 입력하세요.
    if (!guild) {
        message.reply('존재하지 않는 서버입니다.');
        return;
    }

    const members = (await guild.members.fetch()).filter((m) => !m.user.bot).array();
    const membersToRemove = members.slice(0, targetNum);

    for (const member of membersToRemove) {
      await member.kick('복구 인원 처리');
    }

    message.reply(`${guild.name}에서 ${targetNum}명의 인원을 제거했습니다.`);
  }
});

client.login(token);
