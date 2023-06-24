const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log("이 준비되었습니다!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("!공지")) {
    const args = message.content.slice("!공지".length).trim().split(" ");
    const channelMention = args[0];
    const channelID = channelMention.replace(/[<#>]/g, "");
    const channel = await message.guild.channels.cache.get(channelID);

    if (!channel) {
      return message.channel.send("채널을 찾을 수 없습니다. 올바른 채널 맨션을 입력해주세요.");
    }
    const description = args.slice(1).join(" ");
    if (!description) {
      return message.channel.send("공지 메시지를 입력해주세요.");
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("공지")
      .setDescription(description)
      .setColor("RED");

    channel.send({ content: "@everyone", embeds: [embed] }).then((sentMessage) => {
      sentMessage.react("⭕");
    });
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
