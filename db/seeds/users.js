/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id:1,users_name: 'Asai'},
    { id:2,users_name: 'Rion'},
    { id:3,users_name: 'Nami'},
    { id:4,users_name: 'Massu'}
  ]);
};
