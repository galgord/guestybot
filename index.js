require('dotenv').config();
const axios = require('axios');
const slackbot = require('slackbots');
<<<<<<< HEAD
axios.defaults.headers.common = {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
=======
console.log(process.env);
axios.defaults.headers.common = {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}

>>>>>>> 759f825c2b875a3a8164362ebe877d79d4f51971
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
<<<<<<< HEAD
=======

>>>>>>> 759f825c2b875a3a8164362ebe877d79d4f51971
function getActiveListings(accountId){
	var count ="";
	var listingId = "";
	var title = "";
	axios.get(`https://api.guesty.com/api/v2/listings?accountId=${accountId}&active=true&listed=true`)
	.then(res=>{
		count = res.data.results.count;
		for(i=0;i<res.data.results.length;i++){
		listingId = res.data.results[i]._id;
		title = res.data.results[i].title;
<<<<<<< HEAD
=======

>>>>>>> 759f825c2b875a3a8164362ebe877d79d4f51971
		const params = {
 	icon_emoji:':guesty:'
 }
 bot.postMessageToChannel('general', title + "," + listingId,params);
<<<<<<< HEAD
}
 bot.postMessageToChannel('general', `This user has a total of ${count} active and listined listings`,params);
		})
	.catch(error => { console.log(error); return Promise.reject(error); });
	}
=======

}
 bot.postMessageToChannel('general', `This user has a total of ${count} active and listined listings`,params);

		})
	.catch(error => { console.log(error); return Promise.reject(error); });
	}
>>>>>>> 759f825c2b875a3a8164362ebe877d79d4f51971
