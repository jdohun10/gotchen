module.exports = {
    name: 'info',
    description: 'Displays user and server information',
    execute(message, args) {
        const Discord = require('discord.js');
        const user = message.author;
        const server = message.guild;
        const infoEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User and server info for ${message.author.tag}`)
            .addFields(
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Discriminator', value: user.discriminator, inline: true },
                { name: 'Nickname', value: user.nickname ?? 'None', inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Server Name', value: server.name, inline: true },
                { name: 'Server ID', value: server.id, inline: true },
                { name: 'Members', value: server.memberCount, inline: true },
            )
            .setFooter(`Requested by ${user.tag}`);

        message.channel.send({ embeds: [infoEmbed] });
    }
};