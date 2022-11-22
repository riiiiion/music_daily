/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('music').del()
  await knex('music').insert([
    { id: 1,Title: 'マリーゴールド', Artist: "あいみょん"},
    { id: 2,Title: '君はロックを聴かない', Artist: "あいみょん" },
    { id: 3,Title: '裸の心', Artist: "あいみょん" }, 
    { id: 4,Title: 'ロビンソン', Artist: "スピッツ" },
    { id: 5,Title: 'ひまわりの約束', Artist: "秦基博" },
  ]);
};
