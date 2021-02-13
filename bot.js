const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('config.json')
const channel = process.env.CHANNEL_ID;
const unverified = process.env.UNVERIFIED_ROLE_ID;
const verified = process.env.VERIFIED_ROLE_ID;
bot.on('message', (msg) => {
if (msg.channel == channel && msg.member.roles.has(unverified) && msg.content.startsWith("\"")) { 
let name = msg.content.split(" ")
let tag = msg.user.tag.split("#")
if (tag == config.blacklist[0] || tag == config.blacklist[1] || tag == config.blacklist[2] || tag == config.blacklist[3]) {
    tag = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
    tag = tag.toString()
}
msg.member.setNickname("CT-" + tag[1] + "\"" + name[0] + "\"")
.then( () => {
    msg.member.roles.remove(unverified)
    msg.member.roles.add(verified)
})
.catch(msg.reply("Something went wrong. Check the nickname isn't too long"))
} else if (msg.channel == channel && msg.member.roles.has(unverified) && msg.content.startsWith("CT-")) {
    let name = msg.content.split(" ")
    name = name[1]
    name = name.substr(-1)
    name = name.substr(1)
    let tag = msg.content.split(" ")
    tag = tag[0]
    tag = tag.split("-")
    tag = tag[1]
    tag = tag.toString()
    if (tag == config.blacklist[0] || tag == config.blacklist[1] || tag == config.blacklist[2] || tag == config.blacklist[3]) {
    tag = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
    tag = tag.toString()
}
msg.member.setNickname("CT-" + tag[1] + "\"" + name[0] + "\"")
.then( () => {
    msg.member.roles.remove(unverified)
    msg.member.roles.add(verified)
})
}
})
bot.login(process.env.BOT_TOKEN)