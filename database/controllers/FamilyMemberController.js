db = require('../db');
const Family = require('../models/Family_Member');

async function getFamilyPosition(id) {
  let result;

  if (id == 0) {
    const [first] = await getChildren(0);
    first.children = await getChildren(first.id);
    result = first;
  } else if (id > 0) {
    const children = await getChildren(id);
    result = { result: children };
  }
  return result;
}

async function hasChildren(id) {
  try {
    const childrenNumber = await Family.count({ where: { parent_id: id } });
    return Boolean(childrenNumber);
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function getChildren(id) {
  try {
    const children = await Family.findAll({
      where: { parent_id: id },
      attributes: { exclude: ['parent_id', 'createdAt', 'updatedAt'] },
    });
    // Here a part of code that Im not so proud. The best way to say if a family_member has children is to create a table of relations
    // But as our DB is very small , we'll not have problems with that.
    for (const index in children) {
      children[index].dataValues.hasChild = await hasChildren(children[index].dataValues.id);
      if (children[index].dataValues.birth) { children[index].dataValues.birth = children[index].dataValues.birth.split('-')[0]; }
    }
    return children.map((obj) => obj.dataValues);
  } catch (error) {
    console.log(error);
    return ([]);
  }
}

module.exports = { getFamilyPosition, getChildren, hasChildren };
