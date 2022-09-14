const express = require('express');
const { checkUsername } = require('../database/db');
const { addPremium, deletePremium, checkPremium, changeKey } = require('../database/premium');
const { isAuthenticated } = require('../lib/auth');
const { limitCount } = require('../lib/settings');
const router = express.Router();

router.post('/add', isAuthenticated, async (req, res) => {
    let { username, expired } = req.body;
    let checking = await checkUsername(username);
    if (!checking) {
        req.flash('error_msg', 'Username is not registered');
        res.redirect('/admin/index');
    } else {
        let checkPrem = await checkPremium(username)
        if (checkPrem) {
            req.flash('error_msg', 'Username is alredy Premium before');
            res.redirect('/admin/index');
        } else {
            addPremium(username, expired)
            req.flash('success_msg', `Succes Added Premium ${username}`);
            res.redirect('/admin/index');
        }
    }
})

router.post('/delete', isAuthenticated, async  (req, res) => {
    let { username } = req.body;
    let checking = await checkUsername(username);
    if (!checking) {
        req.flash('error_msg', 'Username is not registered');
        res.redirect('/admin/index');
    } else {
        let checkPrem = await checkPremium(username)
        if (checkPrem) {
            deletePremium(username);
            req.flash('success_msg', `Succes Delete Premium ${username}`);
            res.redirect('/admin/index');
        } else {
            req.flash('error_msg', 'Username is not Premium');
            res.redirect('/admin/index');
        }
    };
});

router.post('/custom', isAuthenticated, async (req, res) => {
    let { customKey } = req.body;
    let { username } = req.user
    let checkPrem = await checkPremium(username);
    if (checkPrem) {
        changeKey(username, customKey)
        req.flash('success_msg', `Succes Custom Apikey ${customKey}`);
        res.redirect('/profile');
    } else {
        req.flash('error_msg', 'You are not a premium user');
        res.redirect('/profile');
    }
})

module.exports = router;