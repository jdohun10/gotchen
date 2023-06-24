const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.on("ready", () => {
  console.log(`봇이 준비되었습니다!`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!dm")) {
    // 메시지 삭제
    message.delete();

    const args = message.content.slice(4).trim().split(/ +/);
    const mentionedUser = message.mentions.users.first();
    const dmMessage = args.slice(1).join(" ");

    if (!mentionedUser) {
      return message.channel.send("DM을 보낼 사용자를 맨션 해 주세요.");
    }

    if (!dmMessage.length) {
      return message.channel.send("메시지를 입력해 주세요.");
    }

    const embed = new MessageEmbed()
      .setTitle(`사용자 ${message.author.username}님으로부터의 메시지`)
      .setDescription(dmMessage)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

    // 에러 처리 추가
    try {
      await mentionedUser.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send(`${mentionedUser.username}님에게 DM을 보낼 수 없습니다. DM 기능을 차단한 것으로 보입니다.`);
    }
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
