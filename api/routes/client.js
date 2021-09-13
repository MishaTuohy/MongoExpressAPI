const express = require('express');
const router = express.Router();
const Client = require('../schemas/client-schema');

// Gets all 
router.get("/", (req, res, next) => {
    Client.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
                _id: doc._id,
                personalDetails: {
                    title: doc.personalDetails.title,
                    fname: doc.personalDetails.fname,
                    lname: doc.personalDetails.lname,
                    dob: doc.personalDetails.dob
                },
                contactInformation: {
                    mobile: doc.contactInformation.mobile,
                    homePhone: doc.contactInformation.homePhone,
                    msgPhone: doc.contactInformation.msgPhone,
                    email: doc.contactInformation.email
                },
                homeAddress: {
                    addressLine1: doc.homeAddress.addressLine1,
                    addressLine2: doc.homeAddress.addressLine2,
                    town: doc.homeAddress.town,
                    county_city: doc.homeAddress.county_city,
                    eircode: doc.homeAddress.eircode
                },
                parent_guardian: doc.parent_guardian,
                doctor: doc.doctor,
                referredBy: doc.referredBy,
                request: {
                    type: "GET",
                    url: "http://localhost:8000/client-api/" + doc._id
                }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// Get by Id
router.get('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Post
router.post('/', (req, res, next) => {
    const client = new Client({
        personalDetails: {
            title: req.body.personalDetails.title,
            fname: req.body.personalDetails.fname,
            lname: req.body.personalDetails.lname,
            dob: req.body.personalDetails.dob
        },
        contactInformation: {
            mobile: req.body.contactInformation.mobile,
            homePhone: req.body.contactInformation.homePhone,
            msgPhone: req.body.contactInformation.msgPhone,
            email: req.body.contactInformation.email
        },
        homeAddress: {
            addressLine1: req.body.homeAddress.addressLine1,
            addressLine2: req.body.homeAddress.addressLine2,
            town: req.body.homeAddress.town,
            county_city: req.body.homeAddress.county_city,
            eircode: req.body.homeAddress.eircode
        },
        parent_guardian: req.body.parent_guardian,
        doctor: req.body.doctor,
        referredBy: req.body.referredBy
      });
      client
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /clients",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Update
router.patch("/:clientId", (req, res, next) => {
    const id = req.params.clientId;
    Client.updateOne({_id: id}, {$set: req.body})
            .exec()
            .then(result => {
                res.status(200).json(
                    result
                );
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
  });

  // Deletes by Id
router.delete('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.deleteOne({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json(
                result
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;
