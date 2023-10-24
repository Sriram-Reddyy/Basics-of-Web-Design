const jwt = require("jsonwebtoken");

async function authHandler(req, res, next) {
  const { token, refreshToken } = req.body;
  if (!token) {
    res.status(400).send({ message: "No token present" });
  }
  try {
    result = await jwt.verify(token, process.env.TOKEN_KEY);
    if(result){
        next();
    }else{
        res.send(401).send({ message: "Token is invalid" });
    }
  } catch (err) {
    if(err.message == "jwt expired"){
        var decoded = await jwt.verify(refreshToken, process.env.REFRESH_KEY);
        if(decoded){
          next();
        }
        else{
          res.status(401).send({ message:   err.message});
        }
    }
    else{
      res.status(401).send({ message:   err.message});
    }
  }
}
module.exports = authHandler;