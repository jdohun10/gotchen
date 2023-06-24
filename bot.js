

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on('ready', () => {
    console.log('봇이 준비되었습니다!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!청소')) {
        const numMessagesToDelete = parseInt(message.content.split(' ')[1]);

        if (!numMessagesToDelete || numMessagesToDelete < 1) {
            return message.reply('청소할 메시지 갯수를 입력해주세요. (예: !청소 10)');
        }

        const fetchedMessages = await message.channel.messages.fetch({ limit: numMessagesToDelete + 1 });
        message.channel.bulkDelete(fetchedMessages, true);
    }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
