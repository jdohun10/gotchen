const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const workStartTimes = new Map();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.member.permissions.has('ADMINISTRATOR')) {
        if (message.content === '!출퇴근') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('출근')
                        .setLabel('출근')
                        .setStyle('PRIMARY'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('퇴근')
                        .setLabel('퇴근')
                        .setStyle('DANGER'),
                );

            message.channel.send({ content: '출퇴근 하시려면 누르세요(관리자만 가능) 출근한 관리자들만 확인 가능!! 다들 다 퇴근 일때는 문의 가급적 금지', components: [row] });
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.member.permissions.has('ADMINISTRATOR')) {
        const userId = interaction.user.id; 

        if (interaction.customId === '출근') {
            const startTime = new Date();
            workStartTimes.set(userId, startTime);
            await interaction.reply({ content: `<@${userId}>님께서 출근을 하셨습니다.` });
        } else if (interaction.customId === '퇴근') {
            const endTime = new Date();
            const startTime = workStartTimes.get(userId);

            if (startTime) {
                const elapsedTime = Math.abs((endTime - startTime) / 3600000);
                const hours = Math.floor(elapsedTime);
                const minutes = Math.floor((elapsedTime % 1) * 60);
                await interaction.reply({ content: `<@${userId}>님께서 퇴근을 하셨습니다. 근무 시간: ${hours}시간 ${minutes}분` });
                workStartTimes.delete(userId);
            } else {
                await interaction.reply({ content: `<@${userId}>님의 출근 시간이 등록되지 않았습니다. 출근 버튼을 먼저 눌러주세요.` });
            }
        }
    } else {
        await interaction.reply({ content: '관리자 권한이 필요합니다.', ephemeral: true });
    }
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.G23Oza.5SZz0yrnLLNUDAZykYoxN6r_f-Tl_8NwuDFXAk"); 
