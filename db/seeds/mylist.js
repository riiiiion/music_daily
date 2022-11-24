/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mylist').del()
  await knex('mylist').insert([
    { user_id: 1, music_id: 1, date: "20191122", place: "TOYOTA", comment: "Good"},
    { user_id: 1, music_id: 2, date: "20210415", place: "NAGOYA", comment: "Good" },
    { user_id: 2, music_id: 3, date: "20220205", place: "YOKOHAMA", comment: "Good" },
    { user_id: 3, music_id: 4, date: "20210415", place: "INUYAMA", comment: "Good" },
    { user_id: 4, music_id: 5, date: "20220205", place: "OKAZAKI", comment: "Good" },
    { user_id: 1, music_id: 3, date: "20210415", place: "ANJO", comment: "Good" },
  ]);
};
