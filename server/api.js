const express = require('express')
const router = express.Router()

const { nhdetail, nhpdf, nhsearch, nhpopular, nhlatest, nhrandom, doujindesu, doujinsearch, doujinlatest } = require('../features/animanga')
const { bonk, ship, welcome, welcome2, goodbye, goodbye2, rankcard, levelup, hornycard } = require('../features/creator') 
     
router.get('/nhentai', nhdetail)
router.get('/nhentaipdf', nhpdf)
router.get('/nhsearch', nhsearch)
router.get('/nhpopular', nhpopular)
router.get('/nhlatest', nhlatest)
router.get('/nhrandom', nhrandom)
router.get('/doujindesu', doujindesu)
router.get('/doudesusearch', doujinsearch)
router.get('/doudesulatest', doujinlatest)
     
router.get('/bonk', bonk)
router.get('/ship', ship)
router.get('/welcome', welcome)
router.get('/welcome2', welcome2)
router.get('/goodbye', goodbye)
router.get('/goodbye2', goodbye2)
router.get('/rankcard', rankcard)
router.get('/levelup', levelup)
router.get('/hornycard', hornycard)
     
router.use(function (req, res, next) {
    if (res.statusCode == '200') {
        res.render('notfound', {
            layout: 'notfound'
        })
    }
})

module.exports = router
