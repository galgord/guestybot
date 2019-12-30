const axios = require('axios');
const messageHandler = require('./messageHandler');
const json2csv = require('json2csv').parse;
const FileSystem = require("fs");
const params = {
	icon_emoji: ':guesty:'
}
var listingsData = [];
var fields = []
const getListings = (accountId, isActive, isListed) => {
	var count = "";
	var listingId = "";
	var title = "";
  var jsonData = {}
jsonData.listingsData = listingsData
	axios.get(`https://api.guesty.com/api/v2/listings?accountId=${accountId}&active=${isActive}&listed=${isListed}&limit=100`)
		.then(res => {

			const params = {
				icon_emoji: ':guesty:'
			}
			count = res.data.count;
			if (count === 0) {

				bot.postMessage('guestyidbot', "Looks like this user doesnt have any relevent listings", params);
				return;
			}
			bot.postMessage('guestyidbot', `This user has a total of ${count} listings`, params);
			setTimeout(() => {
      		for (i = 0; i < res.data.results.length; i++) {
					listingId = res.data.results[i]._id;
					title = res.data.results[i].title;
					// bot.postMessage('guestyidbot', title + "\r" + listingId, params);
          listings =
          {
        list: listingId,
        header: title
      }

      listingsData.push(listings)
				}

			}, 350);
		})
		.catch(error => {
			console.log(error);
			return Promise.reject(error);
		});

setTimeout(()=>{
fields = ["list" , "header"];
  makeCSV(listingsData);
},5000);
}

const start = () => {
	bot.on('start', () => {
		// const test = bot.getImChannels();
		// console.log(test._value);
		bot.postMessage('guestyidbot', "Get Ready", params);
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

function makeCSV(jsonData) {
var csv = json2csv(jsonData,fields);

FileSystem.writeFile('file.csv', csv, function(err) {
  if (err) throw err;
  console.log('file saved');
});

}

// FileSystem.writeFileSync("listings w id's.csv", csv);


