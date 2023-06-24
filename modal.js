const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: '모달',
  description: '모달 창을 테스트합니다.',
  async execute(message) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('modal_button')
        .setLabel('모달 열기')
        .setStyle('PRIMARY')
    );

    const content = 'Click the below button';
    const msg = await message.channel.send({ content: content, components: [row] });

    // Message Components 이벤트 등록
    const collector = message.channel.createMessageComponentCollector({
      time: 15000, // 대기 시간을 15초로 설정
      errors: ['time'], // 오류 처리 방법을 'time'으로 설정
    });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'modal_button') {
        const embed = {
          title: '모달',
          description: '이것은 모달 창의 내용입니다',
        };
        await interaction.reply({ embeds: [embed] });
      }
    });

    collector.on('end', async collected => {
      console.log(`collected ${collected.size} interactions`);
      const rows = msg.components;
      rows[0].components[0].setDisabled(true);
      await msg.edit({ content: content + ' [ENDED]', components: rows });
    });
  },
};
