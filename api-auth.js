const authenticateKey = (req, res, next) => {
    const api_key = req.header("X-API-Key"); 
    const account = api_key == process.env.API_KEY;

    if (account) {
        next();
    } else {
      res.status(403).send({ error: { code: 403, message: "You not allowed." } });
    }
  };

module.exports = { authenticateKey };