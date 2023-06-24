const axios = require('axios');

async function getBankBalance(accountNum) {
    // 실제 은행 API에 대한 호출 예시입니다
    const response = await axios.get('https://api.yourbank.com/balance', {
        params: {
            account_number: accountNum,
        },
    });
    return response.data.balance;
}

async function buyGiftCard(value) {
    // 실제 구매 API에 대한 호출 예시입니다
    const response = await axios.post('https://api.example.com/giftcards',
        {
            amount: value,
        },
    );
    return response.data;
}

module.exports = {
    getBankBalance,
    buyGiftCard,
};
