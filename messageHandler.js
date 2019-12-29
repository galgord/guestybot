const helper = require('./helper');
var currentAccountId = "first init"
var wasSent = false;

function handleMessage(message) {
	var firstAnswer = message.replace('<@US4796D70> ', '');
	if (firstAnswer.startsWith("G")) {
		return;
	}
	if (firstAnswer.startsWith("5")) {
		if (wasSent == false) {
			currentAccountId = firstAnswer;
			sendTextOptions();
		}
		wasSent = true;
	} else if (firstAnswer.startsWith("1")) {
		helper.getListings(currentAccountId, true, true);
		setTimeout(() => {wasSent = false},2500);
		return;
	} else if (firstAnswer.startsWith("2")) {
		elper.getListings(currentAccountId, true, false);
		setTimeout(() => {wasSent = false},2500);
		return;
	} else if (firstAnswer.startsWith("3")) {
		helper.getListings(currentAccountId, false, true);
		setTimeout(() => {wasSent = false},2500);
		return;
	} else if (firstAnswer.startsWith("4")) {
		helper.getListings(currentAccountId, false, false);
		setTimeout(() => {wasSent = false},2500);
		return;
	}
	// } else{
	// 	bot.postMessage('guestyidbot',"Sorry, I dont recognize this message..",helper.params);
	// return;
	// }
}

function sendTextOptions() {
	bot.postMessage('guestyidbot', "*What report would you like?* (please reply to @montango with a number)\n1. Active and Listed\n 2. Active and Unlisted\n 3. Inactive and Listed\n 4. Inactive and Unlisted", helper.params);
}

exports.handleMessage = handleMessage;