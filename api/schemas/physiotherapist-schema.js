const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const personalDetailsSchema = mongoose.Schema({
    title: String,
    fname: requiredString,
    lname: requiredString
}, {
    versionKey: false
});

const contactInformationSchema = mongoose.Schema({
    mobile: requiredString,
    homePhone: requiredString,
    email: requiredString,
}, {
    versionKey: false
});

const homeAddressSchema = mongoose.Schema({
    addressLine1: requiredString,
    addressLine2: String,
    town: requiredString,
    county_city: requiredString,
    eircode: String
}, {
    versionKey: false
})

const physiotherapistSchema = mongoose.Schema({
    personalDetails: personalDetailsSchema,
    contactInformation: contactInformationSchema,
    homeAddress: homeAddressSchema,
}, {
    versionKey: false,
    timestamps: true.valueOf,
    collection: 'Physiotherapists'
})

module.exports = mongoose.model('Physiotherapists', physiotherapistSchema);