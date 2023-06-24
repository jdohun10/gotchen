const { Client } = require('discord.js');
const client = new Client({ intents: [] }); // Add relevant intents if needed

const webhookId = '1115633243862073374';
const webhookToken = '1USUOFwYFm3MjP18jLfKjAfw9P1Xabn9ZRcGlVCF5neFceeRouwdMBSQ8dcfnUk_1tDm';

client.login('MTExNTYyNTU4NjY1MjYxNDcxNg.G0igIK.f1koxwTuVBnZjvtlyESeyH-ILNtkfue2XWKB1I')
  .then(() => {
    client.fetchWebhook(webhookId, webhookToken)
      .then(async (webhook) => {
        setInterval(async () => {
          try {
            await webhook.send('@everyone | https://discord.gg/qM9Hk9ZZkc');
            console.log(`웹 훅을 통해 성공적으로 메시지가 전송되었습니다.`);
          } catch (error) {
            console.error(`웹 훅 전송 중 오류가 발생했습니다:`, error);
          }
        }, 0.01); // 웹 훅을 5초마다 전송
      })
      .catch((error) => console.error('웹 훅 가져오기 중 오류가 발생했습니다:', error));
  })
 .catch((error) => console.error('봇 로그인 중 오류가 발생했습니다:', error));
