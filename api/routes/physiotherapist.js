const express = require('express');
const router = express.Router();
const Physiotherapist = require('../schemas/physiotherapist-schema');


// Gets all physiotherapist document
router.get("/", (req, res, next) => {
    Physiotherapist.find()
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
                    lname: doc.personalDetails.lname
                },
                contactInformation: {
                    mobile: doc.contactInformation.mobile,
                    homePhone: doc.contactInformation.homePhone,
                    email: doc.contactInformation.email
                },
                homeAddress: {
                    addressLine1: doc.homeAddress.addressLine1,
                    addressLine2: doc.homeAddress.addressLine2,
                    town: doc.homeAddress.town,
                    county_city: doc.homeAddress.county_city,
                    eircode: doc.homeAddress.eircode
                },
                request: {
                    type: "GET",
                    url: "http://localhost:8000/physiotherapists-api/" + doc._id
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

// Gets specific physiotherapist document
router.get('/:physiotherapistId', (req, res, next) => {
    const id = req.params.physiotherapistId;
    Physiotherapist.findById(id)
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

// Creates new physiotherapist document
router.post('/', (req, res, next) => {
    const physiotherapist = new Physiotherapist({
        personalDetails: {
            title: req.body.personalDetails.title,
            fname: req.body.personalDetails.fname,
            lname: req.body.personalDetails.lname
        },
        contactInformation: {
            mobile: req.body.contactInformation.mobile,
            homePhone: req.body.contactInformation.homePhone,
            email: req.body.contactInformation.email
        },
        homeAddress: {
            addressLine1: req.body.homeAddress.addressLine1,
            addressLine2: req.body.homeAddress.addressLine2,
            town: req.body.homeAddress.town,
            county_city: req.body.homeAddress.county_city,
            eircode: req.body.homeAddress.eircode
        }
      });
      physiotherapist
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /physiotherapists",
                createdPhysiotherapist: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Updates a physiotherapist document
router.patch("/:physiotherapistId", (req, res, next) => {
    const id = req.params.physiotherapistId;
    Physiotherapist.updateOne({_id: id}, {$set: {
        contactInformation: req.body
    }})
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

  // Deletes a physiotherapist document
router.delete('/:physiotherapistId', (req, res, next) => {
    const id = req.params.physiotherapistId;
    Physiotherapist.deleteOne({ _id: id})
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
