const helper = require('./helper');
var currentAccountId = "first init"
function handleMessage(message) {
	var firstAnswer = message.replace('<@US4796D70> ', '');
	if (firstAnswer.startsWith("5")) {
		currentAccountId = firstAnswer;
		sendTextOptions();
	} else if (firstAnswer.startsWith("1")) {
		helper.getListings(currentAccountId, true, true);
	} else if (firstAnswer.startsWith("2")) {
		helper.getListings(currentAccountId, true, false);
	} else if (firstAnswer.startsWith("3")) {
		helper.getListings(currentAccountId, false, true);
	} else if (firstAnswer.startsWith("4")) {
		helper.getListings(currentAccountId, false, false);
	}
}

function sendTextOptions() {
	bot.postMessage('guestybot', "*What report would you like?* (please reply to @montango with a number)\n1. Active and Listed\n 2. Active and Unlisted\n 3. Inactive and Listed\n 4. Inactive and Unlisted", helper.params);
}

exports.handleMessage = handleMessage;
