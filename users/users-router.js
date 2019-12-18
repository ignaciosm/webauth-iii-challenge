const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Users = require('./users-model')

router.get('/', (req, res) => {
  Users.all()
  .then(users => {
    res.json(users)
  })
  .catch(err => res.send(err));
});

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.create(user)
  .then(user => {
    res.json(users)
  })
  .catch(err => res.send(err));
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({username}).first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({msg: 'works'})
    } else {
      res.json({msg: 'wrooooong'})
    }
  })
  .catch(err => res.json({msg: 'fuck this'}));
});


module.exports = router;