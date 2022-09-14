const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    apikey: { type: String },
    defaultKey: { type: String },
    premium: { type: String },
    limit: { type: Number },
    totalreq: { type: Number },
    status: { type: String },
    jid: { type: String }
}, { versionKey: false });
module.exports.User = mongoose.model('api', Users);
