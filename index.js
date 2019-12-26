const axios = require('axios');
const slackbot = require('slackbots');

const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWRmYjg0MTM5NjMwOTQwMDFmNjgzYzVkIiwidXNlcklkIjoiNWI1ZDdhYzdhMmM0MzEwMDQ3NTc2NzFkIiwibmFtZSI6IkdhbC5Hb3Jkb24iLCJkYiI6ImVtcGxveWVlcyIsInJvbGUiOiJhZG1pbiIsInJlcXVlc3RlciI6IkFETUlOIiwiaXNzIjoicHJvZHVjdGlvbi5ndWVzdHkuY29tIiwicmVxdWVzdGVySWQiOiI1YjVkN2FjN2EyYzQzMTAwNDc1NzY3MWQiLCJpYXQiOjE1NzY3NjQ0MzUsImV4cCI6MTU3NzM2OTIzNX0.WFDBvwj_bznec5jKbmUAvtxSXeE4mIkE_HuRgCAxo18";
axios.defaults.headers.common = {'Authorization': `Bearer ${BearerToken}`}

const bot = new slackbot({
	token: 'xoxb-886048913093-888247217238-L2Bur1SCWLx5N7DQDEr6KFs8',
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
bot.on('error',(err)=>{console.log(err); return Promise.reject(error); });

// Message

bot.on('message',(data)=>{
	if(data.type !== 'message'){
		return;
	}
	handleMessage(data.text);
});

function handleMessage(message){
if(message.includes(" hi")){
	replyHi();
}
}

function replyHi(){
	let answer = "test";
	axios.get("https://api.guesty.com/api/v2/listings?accountId=563e0b6a08a2710e00057b82")
	.then(res=>{
		for(i=0;i<res.data.results.length;i++){
		answer = res.data.results[i]._id;
		console.log(answer);
		console.log(this.answer);
		}
	})
	.catch(error => { console.error(error); return Promise.reject(error); });
	const params = {
 	icon_emoji:':guesty:'
 }
 bot.postMessageToChannel('general', `here are the Ids: ${this.answer}`,params);
};
