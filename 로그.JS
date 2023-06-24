const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const TOKEN = 'MTExMjAxODc4OTc3NzgwOTU0OA.G2BDY7.2zPbCK1ByenYrqdXnA77XAJAIwwvGh8ydd59BM';
const CHANNEL_ID = '1105040440719314979';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  
    const targetChannel = client.channels.cache.get(CHANNEL_ID);
    if (targetChannel) {
      const embed = new Discord.MessageEmbed()
        .setTitle("온라인 공지")
        .setDescription("봇이 온라인되었습니다")
        .setColor("RED");
      targetChannel.send({ embeds: [embed] });
    } else {
      console.log(`Channel ID: ${CHANNEL_ID} not found.`);
    }
  });
  
  client.login(TOKEN);
