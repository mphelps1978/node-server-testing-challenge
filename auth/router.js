const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('../users/model')
const { jwtSecret } = require('../config/secrets.js')



router.post("/login", (req, res) => {
  let { userName, password } = req.body;

  Users.findBy({ userName })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // get a token

        res.status(200).json({
          message: `Welcome ${user.userName}!`,
          token, // send the token
        });

      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json({ error: "/login error" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department || "user",
  };

  const options = {
    expiresIn: 1000 * 60 * 10,
  };

  return jwt.sign(payload, jwtSecret, options);
}



module.exports = router