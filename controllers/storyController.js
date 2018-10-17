let router = require('express').Router();
let Story = require('../db').import('../models/story')
// Story.sync({force: 'true'})
let validateSession = require('../middleware/validate-session')

router.post('/new', validateSession, (req, res) => {
    Story.create({
        userStory: req.body.userStory,
        owner: req.user.id 
    }).then(
        createSuccess = (data) => {
            res.json({
                userStory: data,
                message: 'Story Submitted'
            })
        },
        createError = err => res.send(500, err.message)
    )
})

router.get('/getall', (req, res) => {
    Story.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/getmine', validateSession, function (req,res) {
    Story.findAll({
        where: { owner: req.user.id} 
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete('/delete/:id', function(req, res) {
    Story.destroy({
        where: {id: req.params.id}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router; 