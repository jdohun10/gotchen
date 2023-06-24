const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [ Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS ]
});

client.on('ready', () => {
    console.log(`${client.user.tag} 으로 로그인하였습니다!`);
});

client.on('messageCreate', async (msg) => {
    if (msg.content === '!호출') {
        const adminRole = msg.guild.roles.cache.find(role => role.name === '관리자');
        const adminMembers = adminRole?.members.filter(member => member.permissions.has('ADMINISTRATOR'));

        if (adminMembers?.size) {
            adminMembers.forEach(async (member) => {
                if (!member.user.bot) {
                    await member.send(`${member.user.username}님, ${msg.guild.name}에서 호출하셨군요!`);
                }
            });
            msg.reply('모든 관리자에게 DM 메시지를 전송하였습니다.');
        } else {
            msg.reply('해당 서버에서는 관리자 권한을 가진 멤버를 찾을 수 없습니다.');
        }
    }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8");
