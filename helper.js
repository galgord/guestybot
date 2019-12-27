const axios = require('axios');

const getActiveListings = (accountId) => {
    var count = "";
    var listingId = "";
    var title = "";
    axios.get(`https://api.guesty.com/api/v2/listings?accountId=${accountId}&active=true&listed=true&limit=100`)
        .then(res => {
            const params = {
                icon_emoji: ':guesty:'
            }
            count = res.data.count;
            if (count === 0) {

                bot.postMessage('DRP7JA64A', "Looks like this user doesnt have any active and listed listings", params);
                return;
            }
            bot.postMessage('DRP7JA64A', `This user has a total of ${count} active and listed listings`, params);
            setTimeout(() => {
                for (i = 0; i < res.data.results.length; i++) {
                    listingId = res.data.results[i]._id;
                    title = res.data.results[i].title;
                    bot.postMessage('DRP7JA64A', title + "," + listingId, params);
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
        bot.postMessage('DRP7JA64A', "Get Ready", params);
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

exports.getActiveListings = getActiveListings;
exports.start = start;
exports.error = error;
exports.messageReceived = messageReceived;

function handleMessage(message) {
    if (message.includes(" 5")) {
        getActiveListings(message.replace('<@US4796D70> ', ''));

    }
}