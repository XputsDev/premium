const cheerio = require('cheerio')
const axios = require('axios')

function doujindesuSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get(`https://doujindesu.xxx/?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('div.title').text().trim()
				let score = $(e).find('div.score').text().trim()
				let type = $(e).find('div.type').text().replace(/Publishing|Finished/i, '')
				let status = $(e).find('div.type').text().replace(/Manhwa|Manga|Doujinshi/i, '')
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('a').attr('href')
				result.push({ title, score, type, status, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function doujindesuDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.lm').find('h1').text().replace('.', '').trim()
			let link_dl = $('div.chright').find('a').attr('href')
			let image = []
			$('div.reader-area> img').each(function(a, b) {
				image.push($(b).attr('src'))
			})
			resolve({ title, link_dl, image })
		}).catch(reject)
	})
}

function doujindesuLatest() {
	return new Promise((resolve, reject) => {
		axios.get(`https://doujindesu.xxx/`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(a, b) {
				let title = $(b).find('a').attr('alt')
				let chapter = $(b).find('div.plyepisode').find('a').text().trim()
				let type = $(b).find('div.type').text()
				let score = $(b).find('div.score').text().trim()
				let thumb = $(b).find('img').attr('src')
				let link = $(b).find('div.plyepisode').find('a').attr('href')
				result.push({ title, chapter, type, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function mynimeku(query) {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.mynimeku.com/?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox2-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let studio = $(e).find('span.studio').text() || '-'
				let type = $(e).find('div.type').text()
				let score = $(e).find('div.info > div.score').text().trim()
				let season = $(e).find('div.season > a').text() || '-'
				let synopsis = $(e).find('div.synops').text()
				let thumb = $(e).find('div.flexbox2-thumb > img').attr('src')
				result.push({ title, type, score, season, studio, synopsis, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function hanime() {
	return new Promise((resolve, reject) => {
		let url = 'https://hanime.tv'
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.elevation-3').each(function(a, b) {
				let title = $(b).find('a').attr('alt')
				let link = url + $(b).find('a').attr('href')
				result.push({ title, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function domain(query) {
	return new Promise((res, rej) => {
		axios(`https://www.domainesia.com/domain/?domain=${query}`).then(c => {
			let $ = cheerio.load(c.data)
			let result = []
			$('div.results_domain').get().map(v => {
				let domain = $(v).attr('id')
				let price = $(v).text().trim().split(' ')[0]
				if (domain !== undefined && price !== '') result.push({ domain: domain.replace('result_', query + '.'), price })
			})
			res(result)
		}).catch(rej)
	})
}

function getLatest(type, page = 1) {
	return new Promise((resolve, reject) => {
		const baseURL = 'https://nekopoi.care'
		if (/hentai/i.test(type)) {
			axios.get(`${baseURL}/category/hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let desc = $(e).find('p:nth-child(2)').text().trim() || $(e).find('h2:nth-child(1)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, desc, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/3dhentai/i.test(type)) {
			axios.get(`${baseURL}/category/3d-hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/jav/i.test(type)) {
			axios.get(`${baseURL}/category/jav/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/javcosplay/i.test(type)) {
			axios.get(`${baseURL}/category/jav-cosplay/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else {
			axios.get(`${baseURL}/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.eropost').each(function(i, e) {
					let title = $(e).find('h2').text().trim()
					let release_date = $(e).find('span:nth-child(2)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, release_date, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		}
	})
}

module.exports.doujindesuSearch = doujindesuSearch
module.exports.doujindesuDl = doujindesuDl
module.exports.doujindesuLatest = doujindesuLatest
module.exports.mynimeku = mynimeku
module.exports.hanime = hanime
module.exports.domain = domain
module.exports.getLatest = getLatest