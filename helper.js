const axios = require('axios');
const messageHandler = require('./messageHandler');

const params = {
	icon_emoji: ':guesty:'
}

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
		messageHandler.handleMessage(data.text);
	});
}
exports.getListings = getListings;
exports.start = start;
exports.error = error;
exports.messageReceived = messageReceived;
exports.params = params;

