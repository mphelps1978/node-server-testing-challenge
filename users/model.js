const db = require('../config/database')

module.exports = {
  find,
  findBy,
  findById,
  remove,
  update,
  add
}

function find() {
  return db('users')
}

function findBy(param) {
  return db('users')
    .where(param)

}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function remove(id) {
  return db('users')
    .where({id})
    .del()

}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, '*')
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => findById(id));
}