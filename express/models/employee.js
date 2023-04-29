'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const cryptoService = require('../services/crypto.service');

// Define a model for employee table
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alternateEmail: {
      type: DataTypes.STRING
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateOfJoin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    password: DataTypes.STRING,
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'employee'
  });
  // Adding a class level method.
  Model.associate = function (models) {
    this.roleId = this.belongsTo(models.role);
    this.designationId = this.belongsTo(models.designation);
  };

  //Class level methods to making the encrypted password and save this.
  Model.beforeSave(async (user, options) => {
    let err;
    // Hash the password if it has been changed or is new
    if (user.changed('password')) {
      let salt, hash;
      // Asynchronously generates a salt.
      // Randomly select rounds(b/w 4-10) for generating hash
      let rounds = Math.floor(Math.random() * 6 + 4);
      console.log('Rounds: ', rounds);
      [err, salt] = await to(bcrypt.genSalt(rounds));
      console.log('Salt: ', salt);
      if (err) {
        // logger.error('error in encryption in user account' + err.message);
        console.log('error in encryption in user account' + err.message);
      };

      //Asynchronously generates a hash with salt
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      console.log('Hash: ', hash);
      if (err) {
        // logger.error('error in hash method in encryption' + err.message);
        console.log('error in hash method in encryption' + err.message);
      };

      user.password = hash;
    }
  });
  //Instance level methods to compare the password
  Model.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE(ERROR.password_notset);

    //Password verification
    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE(ERROR.invalid_credentials);

    return this;
  };
  //Instance level methods to get the jsonWebToken
  Model.prototype.getJWT = async function () {
    let err, encryptedToken;
    //return the signature for given payload and secretkey
    const token = "Bearer " + jwt.sign({
      id: this.id,
      email: this.email,
      roleId: this.roleId
    }, CONFIG.jwt_encryption, { expiresIn: CONFIG.jwt_expiration });
    console.log('Token: ', token);
    [err, encryptedToken] = await to(cryptoService.encrypt(token));
    if (err) TE(err);
    return encryptedToken;
    // return token;
  };

  return Model;
};