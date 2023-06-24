const { Client, Intents } = require("discord.js");
const fs = require('fs');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

// 명령어 정의 파일 경로 지정
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// 명령어 객체 담는 맵 생성
const commandHandlers = new Map();

// 커맨드 핸들러 등록 함수
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commandHandlers.set(command.data.name, command.execute);
}

// slashCommandHandler 객체 생성
const slashCommandHandler = new Map();

// 메시지 이벤트 등록
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  // 등록된 슬래시 커맨드일 경우 실행
  if (slashCommandHandler.has(interaction.commandName)) {
    try {
      await slashCommandHandler.get(interaction.commandName)(interaction);
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: '커맨드 실행 중 오류가 발생했습니다.',
        ephemeral: true,
      });
    }
  }
});

// 슬래시 커맨드 등록 함수
const registerSlashCommands = async () => {
  const commands = [];

  // 명령어 처리 핸들러 등록
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (command.data && command.data.type === 'CHAT_INPUT') {
      commands.push(command.data);
      slashCommandHandler.set(command.data.name, command.execute);
    }
  }

  const rest = new (require("@discordjs/rest").REST)(
    { version: '9' }
  ).setToken(token);

  const guildId = '1105040439947558944'; // 서버ID 입력

  try {
    console.log('Registering slash commands...');
    await rest.put(
      rest.put(`/applications/${client.application.id}/guilds/${guildId}/commands`, { body: commands }),
    );

    console.log('The slash commands have been registered.');
  } catch (error) {
    console.error(error);
  }
};

// 클라이언트 로그인 후, 슬래시 커맨드 등록
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // await client.application.commands.create(command);
  await registerSlashCommands();
});

client.login("MTExMjAxODc4OTc3NzgwOTU0OA.GOb9SA.mNpHgkUwsg_GzYJuHC2F56919UjbwYqQnmRO0s");
