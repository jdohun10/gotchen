const Discord = require('discord.js');

const bot = new Discord.Client();
const inviteLink = "https://discord.gg/RYXENxMrxv";

bot.on("ready", () => {
  console.log(`봇이 활성화되었습니다!`);
  bot.guilds.fetch("1074359755570675772")
    .then(guild => {
      if (guild) {
        const channel = guild.channels.cache.filter(channel => channel.type === "text")
          .find(channel => channel.permissionsFor(bot.user).has("CREATE_INSTANT_INVITE"))
        if (channel) {
          channel.createInvite({ temporary: false })
            .then(invite => {
              console.log(`봇이 ${channel.name} 채널에서 ${invite.url} 에 초대되었습니다!`);
            })
            .catch(console.error);
        } else {
          console.error("채널을 찾을 수 없습니다.");
        }
      } else {
        console.error("서버를 찾을 수 없습니다.");
      }
    })
    .catch(console.error);
});

bot.on("guildCreate", guild => {
  console.log(`봇이 새로운 서버(${guild.name})에 추가되었습니다.`);
});

bot.login("MTExMjAxODc4OTc3NzgwOTU0OA.GPy4ee.7lxVhEeXyakwbFPUI_LeYv7-36vOrICLE-ZDhM");
