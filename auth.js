const jwt = require('jsonwebtoken');
// require("dotenv").config();
JWT_SECRET = "random123"

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send({ error: 'Invalid token' });
  }
};
