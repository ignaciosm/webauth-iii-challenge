const db = require('../db/db-config');

module.exports = {
  all,
  create,
  findBy
};

function all() {
  return db('users')
};

function create(user) {
  return db('users').insert(user)
};

function findBy(filter) {
  return db('users').where(filter)
};

// function create(user) {
//   return db("users")
//     .insert(user, "id")
//     .then(ids => {
//       const [id] = ids;
//       return all();
//     });
// };