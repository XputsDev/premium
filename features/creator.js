__path = process.cwd()
const { cekKey, limitAdd, isLimit } = require('../database/db');
const { sleep } = require('../lib/function')

const knights = require("knights-canvas")
const fs = require('fs')

async function bonk(req, res) {
    let apikey = req.query.apikey
    if (!req.query.url) return res.status(400).send({ status: 400, message: 'url parameter cannot be empty' })
    if (!req.query.url2) return res.status(400).send({ status: 400, message: 'url2 parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Bonk()
    .setAvatar1(req.query.url) 
    .setAvatar2(req.query.url2)
    .toBuild()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/bonk.png', data)
    await res.sendFile(__path+'/tmp/bonk.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/bonk.png')
}

async function ship(req, res) {
    let apikey = req.query.apikey
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.name2) return res.status(400).send({ status: 400, message: 'name2 parameter cannot be empty' })
    if (!req.query.avatar) return res.status(400).send({ status: 400, message: 'avatar parameter cannot be empty' })
    if (!req.query.avatar2) return res.status(400).send({ status: 400, message: 'avatar2 parameter cannot be empty' })
    if (!req.query.num) return res.status(400).send({ status: 400, message: 'num parameter cannot be empty' })
    if (!req.query.status) return res.status(400).send({ status: 400, message: 'status parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Ship()
    .setName1(req.query.name) 
    .setName2(req.query.name2)
    .setAvatar1(req.query.avatar)
    .setAvatar2(req.query.avatar2)
    .setNum(req.query.num)
    .setStatus(req.query.status)
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/ship.png', data)
    await res.sendFile(__path+'/tmp/ship.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/ship.png')
}

async function welcome(req, res) {
    let apikey = req.query.apikey
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.bgurl) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!req.query.gcname) return res.status(400).send({ status: 400, message: 'gcname parameter cannot be empty' })
    if (!req.query.mem) return res.status(400).send({ status: 400, message: 'mem parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Welcome2()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .setBg(req.query.bgurl)
    .setGroupname(req.query.gcname)
    .setMember(req.query.mem)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/welcome.png', data)
    await res.sendFile(__path+'/tmp/welcome.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/welcome.png')
}
     
async function welcome2(req, res) {
    let apikey = req.query.apikey
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.mem) return res.status(400).send({ status: 400, message: 'mem parameter cannot be empty' })
    if (!req.query.gcname) return res.status(400).send({ status: 400, message: 'gcname parameter cannot be empty' })
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!req.query.bgurl) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!req.query.gcicon) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Welcome()
    .setUsername(req.query.name)
    .setGuildName(req.query.gcname)
    .setGuildIcon(req.query.gcicon)
    .setMemberCount(req.query.mem)
    .setAvatar(req.query.picurl)
    .setBackground(req.query.bgurl)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/welcome2.png', data)
    await res.sendFile(__path+'/tmp/welcome2.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/welcome2.png')
}
     
async function goodbye(req, res) {
    let apikey = req.query.apikey
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.bgurl) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!req.query.mem) return res.status(400).send({ status: 400, message: 'mem parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Goodbye2()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .setBg(req.query.bgurl)
    .setMember(req.query.mem)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/goodbye.png', data)
    await res.sendFile(__path+'/tmp/goodbye.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/goodbye.png')
}
     
async function goodbye2(req, res) {
    let apikey = req.query.apikey
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.mem) return res.status(400).send({ status: 400, message: 'mem parameter cannot be empty' })
    if (!req.query.gcname) return res.status(400).send({ status: 400, message: 'gcname parameter cannot be empty' })
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!req.query.bgurl) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!req.query.gcicon) return res.status(400).send({ status: 400, message: 'bgurl parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Goodbye()
    .setUsername(req.query.name)
    .setGuildName(req.query.gcname)
    .setGuildIcon(req.query.gcicon)
    .setMemberCount(req.query.mem)
    .setAvatar(req.query.picurl)
    .setBackground(req.query.bgurl)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/goodbye2.png', data)
    await res.sendFile(__path+'/tmp/goodbye2.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/goodbye2.png')
}
     
async function rankcard(req, res) {
    let apikey = req.query.apikey
    if (!req.query.name) return res.status(400).send({ status: 400, message: 'name parameter cannot be empty' })
    if (!req.query.currentxp) return res.status(400).send({ status: 400, message: 'currentxp parameter cannot be empty' })
    if (!req.query.requiredxp) return res.status(400).send({ status: 400, message: 'requiredxp parameter cannot be empty' })
    if (!req.query.level) return res.status(400).send({ status: 400, message: 'level parameter cannot be empty' })
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Rank()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name) 
    .setBg(req.query.bgurl)
    .setNeedxp(req.query.requiredxp) 
    .setCurrxp(req.query.currentxp) 
    .setLevel(req.query.level) 
    .setRank("https://i.ibb.co/Wn9cvnv/FABLED.png") 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/card.png', data)
    await res.sendFile(__path+'/tmp/card.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/card.png')
}
   
async function levelup(req, res) {
    let apikey = req.query.apikey
    if (!req.query.picurl) return res.status(400).send({ status: 400, message: 'picurl parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Up()
    .setAvatar(req.query.picurl) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/level.png', data)
    await res.sendFile(__path+'/tmp/level.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/level.png')
}

async function hornycard(req, res) {
    let apikey = req.query.apikey
    if (!req.query.url) return res.status(400).send({ status: 400, message: 'url parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let image = await new knights.Horny()
    .setAvatar(req.query.url) 
    .toBuild()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/horny.png', data)
    await res.sendFile(__path+'/tmp/horny.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/horny.png')
}
     
module.exports = {
    bonk,
    ship,
    welcome, 
    welcome2, 
    goodbye,
    goodbye2, 
    rankcard, 
    levelup, 
    hornycard
}