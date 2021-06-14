db = require('../db');
const Comment = require('../models/Comment');

async function getComments(postName) {
  try {
    const children = await Comment.findAll({
      where: { parent_post: postName },

    });

    return children.map((obj) => obj.dataValues);
  } catch (error) {
    console.log(error);
    return ([]);
  }
}

async function postComment(data) {
  try {
    const createResult = await Comment.create(data);
    return createResult;
  } catch (error) {
    console.log(error);
    return ([]);
  }
}

module.exports = { getComments, postComment };
