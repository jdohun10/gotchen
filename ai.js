const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log(`${client.user.tag} 봇이 준비되었습니다.`);
});

client.on('message', (message) => {
  console.log(`전체 메시지: ${message.content}`); // 로그 추가

  const prefix = "!";

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  console.log("명령어 발견!"); // 로그 추가

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'notice') {
    console.log("공지 명령어 실행!"); // 로그 추가
    const noticeContent = args.join(' ');
      
    const noticeEmbed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('공지 사항 💬')
      .setDescription(noticeContent)
      .setTimestamp()
      .setFooter(`공지 작성자: ${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send(noticeEmbed);
  }
});

const BOT_TOKEN = 'MTExMjAxODc4OTc3NzgwOTU0OA.Gkd9wP.dVpV9JwZ0iw76AsXQKAFNsFutPxeaduioR1Dpg';
client.login(BOT_TOKEN);
