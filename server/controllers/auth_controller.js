module.exports = {
  register: async (req, res) =>  {
    const db = req.app.get('db');
    const { name, username, email, password } = req.body;
    const user = await db.register({name, username, email, password});
    console.log(user)
    res.status(200).send(user[0])
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const user = await db.login({username, password});
    console.log(user);
    res.status(200).send(user[0])
  }
}