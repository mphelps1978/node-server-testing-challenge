const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({route: 'auth'})
})

module.exports = router