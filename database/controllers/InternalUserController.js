db = require('../db');
const User = require('../models/User');

async function createUser(userData) {
  try {
    // check if user already registered
    let userExists = await User.findOne({
      where: {
        username: userData.username,
      },
    });
    if (userExists) { return Promise.reject(new Error('User already registered')); }

    // check if email already registered
    userExists = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (userExists) { return Promise.reject(new Error('Email already registered')); }

    // create user
    const createResult = await User.create(userData);
    return (createResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function listUsers() {
  try {
    const userList = await User.findAll({ raw: true });

    return userList;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUser(username) {
  try {
    const user = await User.findOne({
      raw: true,
      where: { username },
    });

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function alterUser(userData) {
  try {
    const alterResult = await User.update(userData, {
      where: {
        id: userData.id,
      },
    });
    return alterResult;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteUser(username) {
  try {
    const destroyResult = await User.destroy(username, {
      where: { username },
    });
    return destroyResult;
  } catch (error) {
    return Promise.reject(error);
  }
}

// if validated return the user object
async function validateUser(userData) {
  try {
    const validateResult = await User.findOne({
      raw: true,
      where: {
        username: userData.username,
        password: userData.password,
      },
    });
    return validateResult;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createUser, listUsers, getUser, alterUser, deleteUser, validateUser,
};
