module.exports = {
  checkUser: (req, res) => {
    const { user } = req.session;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  }, 
  fetchUsers: async (req, res) => {
    const db = req.app.get('db');
    const users = await db.fetch_users();
    res.status(200).send(users);
  }
}