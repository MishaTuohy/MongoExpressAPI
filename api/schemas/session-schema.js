const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const requiredNumber = {
    type: Number,
    required: true
}

const sessionSchema = mongoose.Schema({
    client: requiredString,
    physiotherapist: requiredString,
    fee: requiredNumber,
    sessionDuration: requiredString,
    sessionType: requiredString,
    sessionNotes: requiredString
}, {
    versionKey: false,
    timestamp: true.valueOf,
    collection: 'Sessions'
})

module.exports = mongoose.model('Sessions', sessionSchema);