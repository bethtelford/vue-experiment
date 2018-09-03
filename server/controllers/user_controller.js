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
    const { id } = req.session.user;
    const users = await db.fetch_users({ id });
    res.status(200).send(users);
  }
}