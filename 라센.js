const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const TOKEN = 'MTExMjAxODc4OTc3NzgwOTU0OA.GNM53N.greRZndctR8Esuvsk0vCGWlY1gITjFMp3x6mB8';

const licenseCodes = [];

function generateLicenseCode() {
    return Math.floor(Math.random() * 1000000000).toString(36).toUpperCase().padStart(6, '0');
}

async function sendLicensesCode(msg, amounts) {
    const codesToSend = [];
    for (let i = 0; i < amounts; i++) {
        const newCode = generateLicenseCode();
        licenseCodes.push(newCode);
        codesToSend.push(newCode);
    }
    
    // 개인 DM을 열고 라이선스 코드 보내기
    const dmChannel = await msg.author.createDM();
    dmChannel.send(`너의 라이선스 코드: ${codesToSend.join(', ')}`);
}

client.on('message', async (msg) => {
    if (msg.content.startsWith('!generateLicenseCode')) {
        const amounts = parseInt(msg.content.split(' ')[1], 10);
        if (isNaN(amounts) || amounts < 1) {
            msg.channel.send('유효한 숫자를 입력해 주세요.');
            return;
        }
        await sendLicensesCode(msg, amounts);
    }
});

client.login(TOKEN);