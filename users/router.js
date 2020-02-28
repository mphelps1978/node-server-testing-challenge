const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('./model')

router.get('/', (req, res) => {
  Users.find()
  .then(users =>{
  res.status(200).json(users)
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({message: 'Error retrieving users'})

  })
})

router.post('/', checkInput, (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Users.add(user)
    .then(user => {
      console.log(user);
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({message: 'There was an error adding the user'})
    })
})

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user has beeen deleted' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({message: 'Error removing the user'});
  });
});


router.put('/:id', checkInput, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({message: 'Error updating the user'});
  });
});


function checkInput(req, res, next) {
  const {userName, password, department} = req.body
  if (!req.body || !userName || !password || !department) {
    res.status(400).json({message: 'Please ensure Username, password, and department are present'})
  } else {
    next()
  }
}

module.exports = router