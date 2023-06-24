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

client.on('messageCreate', msg => {
    if (msg.content === '!시간확인') {
      const embed = new Discord.MessageEmbed()
        .setTitle("의뢰 시간")
        .setDescription("도훈: 월화수일\n갓천: 목금토일 ")
        .setColor("RED");
  
      msg.channel.send({ embeds: [embed] });
    }
  });
  
  
client.login("MTExMjAxODc4OTc3NzgwOTU0OA.G23Oza.5SZz0yrnLLNUDAZykYoxN6r_f-Tl_8NwuDFXAk"); 
