let router = require('express').Router();
let User = require('../db').import('../models/objects')
let validateSession = require('../middleware/validate-session')

router.post('/new', validateSession, (req, res) => {
    User.create({
        randomObject: req.body.randomObject
    })
    .then(
        createSuccess = (object) => {
            res.json({
                object: object,
                message: 'object created'
            })
        },
        createError = err => res.send(500, err.message)  
    )
})

router.get('/', (req, res) => {
    User.findAll()
    .then(robject => res.status(200).json(robject))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/update/:id', validateSession, (req, res) => {
    if(!req.errors) { 
        User.update({
            randomObject: req.body.randomObject
        }, {where: {id: req.params.id}})
        .then(robject => res.status(200).json(robject))
        .catch(robject => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

router.delete('/delete/:id', validateSession, (req, res) => {
    User.destroy({ where: {id: req.params.id}})
    .then(robject => res.status(200).json(robject))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;  