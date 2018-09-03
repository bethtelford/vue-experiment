module.exports = {
  register: async (req, res) =>  {
    const db = req.app.get('db');
    const { session } = req;
    const { name, username, email, password } = req.body;
    let user = await db.register({name, username, email, password});
    user = user[0]
    session.user = user;
    res.status(200).send(user[0])
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { session } = req;
    const { username, password } = req.body;
    let user = await db.login({username, password});
    user = user[0];
    if (user) {
      session.user = user;
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  }
}