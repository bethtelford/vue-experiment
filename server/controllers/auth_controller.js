const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    const db = req.app.get('db');
    const { session } = req;
    const { name, username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        try {
          let user = await db.register({ name, username, email, password: hash });
          user = user[0]
          session.user = user;
          res.status(200).send(user[0]);
        } catch (err) {
          res.sendStatus(500);
        }
      })
    })
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { session } = req;
    const { username, password } = req.body;

    try {
      let user = await db.login({ username });
      user = user[0];
      if (user) {
        bcrypt.compare(password, user.password, (err, answer) => {
          if (answer) {
            session.user = user;
            res.status(200).send(user);
          } else {
            res.sendStatus(401);
          }
        })
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
}