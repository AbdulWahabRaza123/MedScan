const jwt = require("jsonwebtoken");
const User = require("../models/patient");
const authUser = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootKey = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootKey) {
      // throw new Error("error");
      res.status(401).json({ message: "error" });
    }
    req.rootUser = rootKey;
    next();
  } catch (e) {
    res.status(401).json({ message: "error" });
    // return { message: "error" };
  }
};
module.exports = authUser;