__path = process.cwd()
const { cekKey, limitAdd, isLimit } = require('../database/db');
const ch = require('../lib/scraper')

const fs = require('fs')
const topdf = require('image-to-pdf')
const request = require('request')
const fetch = require('node-fetch')
const axios = require('axios')
const nhentai = require('nhentai-node-api')
const cheerio = require('cheerio')

async function nhdetail(req, res) {
    let code = req.query.code
    let apikey = req.query.apikey
    if (!code) return res.status(400).send({ status: 400, message: 'code parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    let result = await nhentai.getDoujin(code)
    res.status(200).json({ status: 200, result: result })
}
   
async function nhpdf(req, res) {
    let code = req.query.code
    let apikey = req.query.apikey
    if (!code) return res.status(400).send({ status: 400, message: 'code parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    nhentai.getDoujin(code).then(async doujin => {
        let count = 0
        let ResultPdf = []
        let title = doujin.title.default || doujin.title.pretty || doujin.title.native
        let array_page = doujin.pages
        
        for (let i = 0; i < array_page.length; i++) {
            if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
            let image_name = './tmp/' + title + i + '.jpg'
            await new Promise((resolve) => request(array_page[i]).pipe(fs.createWriteStream(image_name)).on('finish', resolve))
            ResultPdf.push(image_name)
            count++
        }
      
        await new Promise((resolve) => topdf(ResultPdf, 'A4').pipe(fs.createWriteStream('./tmp/' + title + '.pdf')).on('finish', resolve))
        for (let i = 0; i < array_page.length; i++) fs.unlinkSync('./tmp/' + title + i + '.jpg')
             
        let options = { method: 'POST', url: 'https://api.anonfiles.com/upload', formData: { file: fs.createReadStream(`./tmp/${title}.pdf`) }}
        request(options, function(err, body) {
            if (err) return res.status(400).json({ error: String(err) })
            fs.unlinkSync(`./tmp/${title}.pdf`)
            axios.get(JSON.parse(body.body).data.file.url.full).then(({ data }) => {
                let $ = cheerio.load(data)
                let url = $('#download-url').attr('href')
                res.status(200).json({ status: 200, result: { filename: JSON.parse(body.body).data.file.metadata.name, filesize: JSON.parse(body.body).data.file.metadata.size.readable, cover: doujin.cover, url: encodeURI(url) }})
            })
        })
    }).catch(err => res.status(400).json({ error: String(err) }))
}
     
async function nhsearch(req, res) {
    try {
        let query = req.query.query
        let apikey = req.query.apikey
        if (!query) return res.status(400).send({ status: 400, message: 'query parameter cannot be empty' })
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await nhentai.search(query)
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}
     
async function nhpopular(req, res) {
    try {
        let apikey = req.query.apikey
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await nhentai.getPopular()
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}
     
async function nhlatest(req, res) {
    try {
        let apikey = req.query.apikey
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await nhentai.getLatest()
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}
     
async function nhrandom(req, res) {
    try {
        let apikey = req.query.apikey
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await nhentai.random()
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}
     
async function doujindesu(req, res) {
    let url = req.query.url
    let apikey = req.query.apikey
    if (!url) return res.status(400).send({ status: 400, message: 'url parameter cannot be empty' })
    if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
    let check = await cekKey(apikey)
    if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
    let limit = await isLimit(apikey);
    if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
    limitAdd(apikey);
    ch.doujindesuDl(url).then(async doujin => {
        let count = 0
        let ResultPdf = []
        let title = doujin.title 
        let array_page = doujin.image
             
        for (let i = 0; i < array_page.length; i++) {
            if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
            let image_name = './tmp/' + title + i + '.jpg'
            await new Promise((resolve) => request(array_page[i]).pipe(fs.createWriteStream(image_name)).on('finish', resolve))
            ResultPdf.push(image_name)
            count++
        }
             
        await new Promise((resolve) => topdf(ResultPdf, 'A4').pipe(fs.createWriteStream('./tmp/' + title + '.pdf')).on('finish', resolve))
        for (let i = 0; i < array_page.length; i++) fs.unlinkSync('./tmp/' + title + i + '.jpg')
             
        let options = { method: 'POST', url: 'https://api.anonfiles.com/upload', formData: { file: fs.createReadStream(`./tmp/${title}.pdf`) }}
        request(options, function(err, body) {
            if (err) return res.status(400).json({ error: String(err) })
            fs.unlinkSync(`./tmp/${title}.pdf`)
            axios.get(JSON.parse(body.body).data.file.url.full).then(({ data }) => {
                let $ = cheerio.load(data)
                let url = $('#download-url').attr('href')
                res.status(200).json({ status: 200, result: { filename: JSON.parse(body.body).data.file.metadata.name, filesize: JSON.parse(body.body).data.file.metadata.size.readable, cover: doujin.image[1], url: encodeURI(url) }})
            })
        })
    }).catch(err => res.status(400).json({ error: String(err) }))
}
     
async function doujinsearch(req, res) {
    try {
        let query = req.query.query
        let apikey = req.query.apikey
        if (!query) return res.status(400).send({ status: 400, message: 'query parameter cannot be empty' })
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await ch.doujindesuSearch(query)
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}
     
async function doujinlatest(req, res) {
    try {
        let apikey = req.query.apikey
        if (!apikey) return res.status(400).send({ status: 400, message: 'apikey parameter cannot be empty' })
        let check = await cekKey(apikey)
        if (!check) return res.status(404).send({ status: 404, message: `apikey ${apikey} not found, please register first.` })
        let limit = await isLimit(apikey);
        if (limit) return res.status(429).send({ status: 429, message: 'requests limit exceeded (100 req / day), call owner for an upgrade to premium' })
        limitAdd(apikey);
        let result = await ch.doujindesuLatest()
        res.status(200).json({ status: 200, result: result })
    } catch(err) {
        console.log(err)
        res.status(500).send({ status: 500, message: 'An internal error occurred.' })
    }
}

module.exports = { 
   nhdetail, 
   nhpdf, 
   nhsearch,
   nhpopular, 
   nhlatest, 
   nhrandom,
   doujindesu, 
   doujinsearch, 
   doujinlatest
}
