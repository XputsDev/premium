const { User } = require('./model');
const toMs = require('ms');
const { limitCount, limitPremium } = require('../lib/settings');

    async function addPremium(username, expired) {
        User.updateOne({username: username}, { premium: Date.now() + toMs(expired), limit: limitPremium}, function (err, res) {
            if (err) throw err;
        })
    }
    module.exports.addPremium = addPremium

    async function ExpiredTime() {
        let users = await User.find({});
        users.forEach(async(data) => {
            let { premium, defaultKey, username } = data
            if (!premium || premium === null) return
            if (Date.now() >= premium) {
                User.updateOne({username: username}, {apikey: defaultKey, premium: null, limit: limitCount}, function (err, res) {
                    if (err) throw err;
                    console.log(`Masa Premium ${username} sudah habis`)
                })
            }
        })
    }
    module.exports.ExpiredTime = ExpiredTime

    async function deletePremium(username) {
        let users = await User.findOne({username: username});
        let key = users.defaultKey
        User.updateOne({username: username}, {apikey: key, premium: null, limit: limitCount}, function (err, res) {
            if (err) throw err;
        })
    }
    module.exports.deletePremium = deletePremium

    async function checkPremium(username) {
        let users = await User.findOne({username: username});
        if (users.premium === null) {
            return false;
        } else {
            return true;
        };
    };
    module.exports.checkPremium = checkPremium;

    async function changeKey(username, key) {
        User.updateOne({username: username}, {apikey: key}, function (err, res) {
            if (err) throw err;
        });
    }
    module.exports.changeKey = changeKey

    async function getTotalUser() {
        let db = await User.find({})
        return db.length
    }
    module.exports.getTotalUser = getTotalUser