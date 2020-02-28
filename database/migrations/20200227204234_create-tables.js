
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table
      .string('userName', 256)
      .notNullable();

    table
      .string('password', 50)
      .notNullable();

    table
      .string('department', 50)
      .notNullable();

    table
      .boolean('token')
      .defaultTo(false);


  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
