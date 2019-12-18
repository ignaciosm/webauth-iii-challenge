const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./users-model');

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
      const token = Users.signToken(user);
      res.json({token: token})
    } else {
      res.status(401).json({msg: 'You shall not pass!'})
    }
  })
  .catch(err => res.status(500).json({msg: 'fuck this'}));
});

module.exports = router;