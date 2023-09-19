const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
const { SIGN_MESSAGE } = require("../utils/constant");
const {
  checkIsValidSignature,
} = require("../utils/blockchain");

exports.signin = async (req, res) => {
  const { address, signature } = req.body;
  const userFound = await User.findOne({
    address,
  });
  const isValidSignature = checkIsValidSignature(
    SIGN_MESSAGE,
    signature,
    address
  );
  if (!isValidSignature) {
    res.status(400).send({ message: "Signature invalid!" });
    return;
  }
  if (!userFound) {
    const newUser = new User({
      address,
    });
    await newUser.save();
  }
  const token = jwt.sign({ id: userFound._id }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });
  res.status(200).send({
    id: userFound._id,
    address,
    accessToken: token,
  });
  return;
};
