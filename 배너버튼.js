const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

const userWarnings = new Map();

client.once('ready', () => {
  console.log('Ready!');
});

const prefix = "!";

client.on("messageCreate", async (message) => {
  // 배열 선언하기
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "createbannerchannel") {
    message.reply("배너 채널 이름을 입력해 주세요.");
    const filter = (m) => message.author.id === m.author.id;

    // 사용자가 입력한 채널 이름 가져오기
    message.channel
      .awaitMessages({ filter, max: 1, time: 10000 })
      .then((collected) => {
        const channelName = collected.first().content;

        // 나머지 코드는 기존 코드와 동일합니다.
        const guild = message.guild;
        guild.channels
          .create(channelName, {
            type: "text",
            topic: "배너 채널",
          })
          .then((channel) => {
            console.log(`채널 ${channel.name}이(가) 생성되었습니다.`);

            // 기존 모든 권한 삭제하기
            Promise.all([
              channel.permissionOverwrites.set(guild.roles.everyone, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: false,
                READ_MESSAGE_HISTORY: true,
              }),
              channel.permissionOverwrites.set(message.author.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
              }),
            ])
              .then(() => {
                console.log(`채널에 권한을 설정했습니다.`);
                message.reply(`\`${channel.name}\` 채널이 생성되었습니다!`);
              })
              .catch(() => {
                console.error(`채널 권한을 설정하는 중 에러가 발생했습니다.`);
              });
          });
      })
      .catch((collected) => {
        message.reply("시간이 초과되었습니다. 다시 시도해 주세요.");
      });
  }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GpuYNO.q3jDR2GrJ_asKwSeJesVUufYlfZdi1sWmDI6Z4");
