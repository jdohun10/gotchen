const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
const PREFIX = '!';

client.once('ready', () => {
  console.log('Ready!');
});

const warnings = new Map();

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'warn') {
    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply('관리자 권한이 필요합니다.');
    }

    const userToWarn = message.mentions.users.first();
    if (!userToWarn) {
      return message.reply('경고할 사용자를 언급해야 합니다.');
    }

    const userWarnings = warnings.get(userToWarn.id) || 0;
    warnings.set(userToWarn.id, userWarnings + 1);

    if (warnings.get(userToWarn.id) === 3) {
      const member = message.guild.members.cache.get(userToWarn.id);
      if (member) {
        await member.roles.add('mute_role_id'); // 뮤트 역할 ID로 교체하세요.
      }
      message.channel.send(`${userToWarn}님, 경고 3회 누적으로 뮤트되었습니다.`);
    } else if (warnings.get(userToWarn.id) === 5) {
      const member = message.guild.members.cache.get(userToWarn.id);
      if (member) {
        await member.kick('경고 5회 누적');
      }
      message.channel.send(`${userToWarn}님, 경고 5회 누적으로 추방되었습니다.`);
    } else if (warnings.get(userToWarn.id) === 10) {
      const member = message.guild.members.cache.get(userToWarn.id);
      if (member) {
        await member.ban({ reason: '경고 10회 누적' });
      }
      message.channel.send(`${userToWarn}님, 경고 10회 누적으로 차단되었습니다.`);
    } else {
      message.channel.send(`${userToWarn}님, 경고 ${warnings.get(userToWarn.id)}회가 누적되었습니다.`);
    }
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
