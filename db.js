const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    discord_id: String,
    bank_account_number: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
