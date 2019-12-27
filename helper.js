const axios = require('axios');


const getListings = (accountId, isActive, isListed) => {
	var count = "";
	var listingId = "";
	var title = "";
	axios.get(`https://api.guesty.com/api/v2/listings?accountId=${accountId}&active=${isActive}&listed=${isListed}&limit=100`)
		.then(res => {
			const params = {
				icon_emoji: ':guesty:'
			}
			count = res.data.count;
			if (count === 0) {

				bot.postMessage('guestybot', "Looks like this user doesnt have any relevent listings", params);
				return;
			}
			bot.postMessage('guestybot', `This user has a total of ${count} listings`, params);
			setTimeout(() => {
				for (i = 0; i < res.data.results.length; i++) {
					listingId = res.data.results[i]._id;
					title = res.data.results[i].title;
					bot.postMessage('guestybot', title + "," + listingId, params);
				}
			}, 350);
		})
		.catch(error => {
			console.log(error);
			return Promise.reject(error);
		});
}
const start = () => {
	bot.on('start', () => {
		const params = {
			icon_emoji: ':guesty:'
		}
		// const test = bot.getImChannels();
		// console.log(test._value);
		bot.postMessage('guestybot', "Get Ready", params);
	});
}
const error = () => {
	bot.on('error', (err) => {
		console.log(err);
		return Promise.reject(err);
	});
}

const messageReceived = (message) => {
	bot.on('message', (data) => {
		if (data.type !== 'message') {
			return;
		}
		handleMessage(data.text);
	});
}
const sendOptions = () => {
	var json = [{
			"type": "section",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Which Report Would You Like?"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Active and Listed*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Choose"
				},
				"value": "1"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Active and Unlisted*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Choose"
				},
				"value": "2"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Inactive and Listed*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Choose"
				},
				"value": "3"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Inactive and Unlisted*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Choose"
				},
				"value": "4"
			}
		}
	];
	axios({
			method: 'post',
			url: "https://hooks.slack.com/services/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",
			data: JSON.stringify(json),
			headers: {
				Authorization: "xoxp-886048913093-888246338662-886049789333-75b070527182fe5f8cc013d7475120c8"
			}
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};
exports.getListings = getListings;
exports.start = start;
exports.error = error;
exports.messageReceived = messageReceived;

function handleMessage(message) {
	var currentAccountId = "";
	if (message.includes(" 5")) {
		currentAccountId = message.replace('<@US4796D70> ', '');
		sendOptions();
	} else if (message.includes(" 1")) {
		console.log(currentAccountId)
		// getListings(currentAccountId, true, true);
	} else if (message.includes(" 2")) {
		console.log(currentAccountId)
		// getListings(currentAccountId, true, false);
	} else if (message.includes(" 3")) {
		console.log(currentAccountId)
		// getListings(currentAccountId, false, true);
	} else if (message.includes(" 4")) {
		console.log(currentAccountId)
		// getListings(currentAccountId, false, false);
	}
}