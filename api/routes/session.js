const express = require('express');
const router = express.Router();
const Session = require('../schemas/session-schema');

// Gets all 
router.get("/", (req, res, next) => {
    Session.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
                _id: doc._id,
                client: doc.client,
                physiotherapist: doc.physiotherapist,
                fee: doc.fee,
                sessionDuration: doc.sessionDuration,
                sessionType: doc.sessionType,
                sessionNotes: doc.sessionNotes,
                request: {
                    type: "GET",
                    url: "http://localhost:8000/sessions-api/" + doc._id
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

// Gets by Id
router.get('/:sessionId', (req, res, next) => {
    const id = req.params.sessionId;
    Session.findById(id)
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
    const session = new Session({
        client: req.body.client,
        physiotherapist: req.body.physiotherapist,
        fee: req.body.fee,
        sessionDuration: req.body.sessionDuration,
        sessionType: req.body.sessionType,
        sessionNotes: req.body.sessionNotes
    });
    session
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /sessions",
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

// Updatet
router.patch("/:sessionId", (req, res, next) => {
    const id = req.params.sessionId;
    Session.updateMany({_id: id}, {$set: req.body})
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

// Delete by Id
router.delete('/:sessionId', (req, res, next) => {
    const id = req.params.sessionId;
    Session.deleteOne({ _id: id})
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
