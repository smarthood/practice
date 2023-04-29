const validator = require('validator');
const Employee = require('../models').employee;
const User = require('../models').user;

const authUser = async function (userAccountInfo) {
  console.log("authUser");
  let emailId = userAccountInfo.email;
  let user;
  //Check the given email is valid email
  if (validator.isEmail(emailId)) {
    console.log("valid email");
    //findOne method to find the user for the given email id.
    [err, user] = await to(User.findOne({
      where: {
        email: emailId,
      },
    }));
    if (err) TE(err.message);
    if (!user) {
      TE(ERROR.invalid_credentials);
    }
  } else {
    TE(ERROR.invalid_email);
  }

  //For comparing the given password to the user instance
  [err, user] = await to(user.comparePassword(userAccountInfo.password));

  if (err) TE(err.message);

  return user;
}
module.exports.authUser = authUser;