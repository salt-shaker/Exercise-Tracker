const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log("Request Completed");
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });

    User.find()
        .then(users => {
            let duplicate = users.filter(v => v.username === username);
            if (users.length > 29) {
                res.json({ userAdd: false, userExist: false, maxLimit: true })
            } else if (duplicate.length > 0) {
                res.json({ userAdd: false, userExist: true, maxLimit: false })
            } else {
                newUser.save()
                    .then(res.json({ userAdd: true, userExist: false, maxLimit: false, user: newUser }))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/i/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ userRemoved: true }))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;