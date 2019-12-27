require('dotenv').config();
const helper = require('./helper');
const axios = require('axios');
const slackbot = require('slackbots');

axios.defaults.headers.common = {
	'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
	'Content-Type' : "application/json"
}

bot = new slackbot({
	token: process.env.BOT_TOKEN,
	name: "Montango"
});
// On Start
helper.start()
// Error
helper.error()
// Message
helper.messageReceived();
