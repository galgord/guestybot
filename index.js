require('dotenv').config();
const axios = require('axios');
const slackbot = require('slackbots');

axios.defaults.headers.common = {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}

bot = new slackbot({
	token: process.env.BOT_TOKEN,
	name: "Montango"
});
// On Start
bot.on('start', ()=>{
 const params = {
 	icon_emoji:':guesty:'
 }
 bot.postMessageToChannel('general',"Ger Ready",params);
});
// Error
bot.on('error',(err)=>{console.log(err); return Promise.reject(err); });
// Message
bot.on('message',(data)=>{
	if(data.type !== 'message'){
		return;
	}
	handleMessage(data.text);
});
function handleMessage(message){
if(message.includes(" 5")){
	getActiveListings(message.replace('<@US4796D70> ',''));
}
}

function getActiveListings(ac
	countId){
	var count ="";
	var listingId = "";
	var title = "";
	axios.get(`https://api.guesty.com/api/v2/listings?accountId=${accountId}&active=true&listed=true&limit=100`)
	.then(res=>{
			const params = {
 	icon_emoji:':guesty:'
 }
		count = res.data.count;
		if(count === 0){

  bot.postMessageToChannel('general', "Looks like this user doesnt have any active and listed listings" ,params);
  return;
		}
 bot.postMessageToChannel('general', `This user has a total of ${count} active and listed listings`,params);
 setTimeout(()=>{
		for(i=0;i<res.data.results.length;i++){
		listingId = res.data.results[i]._id;
		title = res.data.results[i].title;
 bot.postMessageToChannel('general', title + "," + listingId,params);
}},350);
		})
	.catch(error => { console.log(error); return Promise.reject(error); });
	}

