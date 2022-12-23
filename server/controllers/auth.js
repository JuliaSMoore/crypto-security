const bcrypt = require(`bcryptjs`)

const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      console.log(req.body)
      let user
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            user = users[i]
        }
      }
      
      if (!user) {
        console.log(user)
        res.status(200).send(`User not found!`)
        return
      }

      bcrypt.compare (password, user.hash)
      .then ((isMatching) => {
        if(isMatching) {
          console.log(user)
          res.status(200).send(user)
        } else {
          res.status(200).send(`Bad Password`)
        }
      })


    },
    register: (req, res) => {
      let {username, email, firstName, lastName, password} = req.body
      let saltRound = 10

      bcrypt.hash(password, saltRound, function (err, hash) {
        if (err) {
          console.log(err);
          return;
        }
        
        users.push({
          username,
          email,
          hash,
          firstName,
          lastName,
          
        })
        res.status(200).send(req.body)
          console.log(users)

      })
    }

  //   register: (req, res) => {
  //     const { username, email, firstName, lastName, password } = req.body
  //     const salt = bcrypt.genSaltSync(5)
  //     const passwordHash = bcrypt.hashSync(password, salt)
  //     let user = {
  //       username,
  //       email,
  //       firstName,
  //       lastName,
  //       passwordHash
  //     }
  //     users.push(user)
  //     let userToReturn = {...user}
  //     delete userToReturn.passwordHash
  //     res.status(200).send(userToReturn)
  //     console.log(users)
  // }
}