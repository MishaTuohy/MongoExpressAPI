const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const personalDetailsSchema = mongoose.Schema({
    title: String,
    fname: requiredString,
    lname: requiredString,
    dob: requiredString,
}, {
    versionKey: false
});

const contactInformationSchema = mongoose.Schema({
    mobile: requiredString,
    homePhone: requiredString,
    msgPhone: Boolean,
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

const clientSchema = mongoose.Schema({
    personalDetails: personalDetailsSchema,
    contactInformation: contactInformationSchema,
    homeAddress: homeAddressSchema,
    parent_guardian: requiredString,
    doctor: requiredString,
    referredBy: requiredString,
}, {
    versionKey: false,
    timestamps: true.valueOf,
    collection: 'Clients'
})

module.exports = mongoose.model('Clients', clientSchema);