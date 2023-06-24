const Discord = require('discord.js');
const { Client, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_MEMBERS"] });

const token = 'MTExMjAxODc4OTc3NzgwOTU0OA.GveD-z.NM5UpROtw8UrdZzfwQbk_-ZF-q9h7vjj7uIZOs';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
  
    const { customId, user } = interaction;
  
    if (customId === 'admin_button') {
      const guild = interaction.guild;
      const member = await guild.members.fetch(user.id);
  
  
      await member.roles.add('관리자');
      await interaction.reply(`'${user.username}'님이 관리자로 승격되었습니다.`);
    }
  });
  
  

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!admin')) {
    const adminButton = new MessageButton()
      .setLabel('관리자')
      .setStyle('PRIMARY')
      .setCustomId('admin_button');

    const row = new MessageActionRow().addComponents(adminButton);

    message.channel.send({
      content: '이 버튼을 클릭하여 관리자 역할을 부여하거나 제거하세요.',
      components: [row]
    });
  }
});

client.login(token);
