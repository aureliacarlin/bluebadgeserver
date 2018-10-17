let router = require('express').Router();
let User = require('../db').import('../models/settings')
let validateSession = require('../middleware/validate-session')

router.post('/newset', validateSession, (req, res) => {
    User.create({
        objectSetting: req.body.objectSetting,
    })
    .then(
        createSuccess = (setting) => {
            res.json({
                setting: setting,
                message: 'Setting created'
            })
        },
        createError = err => res.send(500, err.message)  
    )
})

router.get('/', (req, res) => {
    User.findAll()
        .then(settings => res.status(200).json(settings))
        .catch(err => res.status(500).json({error: err}))
})

router.put('/update/:id', validateSession, (req, res) => {
    if(!req.errors) { 
    User.update({
        objectSetting: req.body.objectSetting
    }, {where: {id: req.params.id}})
    .then(setting => res.status(200).json(setting))
    .catch(setting => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

router.delete('/delete/:id', validateSession, (req, res) => {
    User.destroy({ where: {id: req.params.id}})
    .then(setting => res.status(200).json(setting))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router; 