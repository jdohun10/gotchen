const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async message => {
  if (message.content === '테스트 도와주실분 한명 구함 이모티콘 누르삼') {
    message.react('👍');
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.emoji.name === '👍' && !user.bot) {
    const guild = reaction.message.guild;
    const member = guild.members.cache.get(user.id);
    const role = guild.roles.cache.find(role => role.name === '테스트 도와주실분');

    if (role && member) {
      await member.roles.add(role);
      user.send('역할이 성공적으로 추가되었습니다.');
    } else {
      user.send('오류가 발생했습니다. 역할을 추가할 수 없습니다.');
    }
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
