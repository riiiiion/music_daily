/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('music').del()
  await knex('music').insert([
    { id: 1,Title: 'マリーゴールド', Artist: "あいみょん",img:"https://i.scdn.co/image/ab67616d0000b273373b993b5d31fb1189d4766e"},
    { id: 2,Title: '君はロックを聴かない', Artist: "あいみょん",img:"https://i.scdn.co/image/ab67616d0000b27333c05e1d08fec494a30bd240" },
    { id: 3,Title: 'Naked Heart', Artist: "あいみょん",img: "https://i.scdn.co/image/ab67616d0000b273d56ef749e7eeb2f070619bcc"}, 
    { id: 4,Title: 'ロビンソン', Artist: "スピッツ",img:"https://i.scdn.co/image/ab67616d0000b27316aeaa20fccbe7ef8e32f876" },
    { id: 5,Title: 'ひまわりの約束', Artist: "秦基博",img:"https://i.scdn.co/image/ab67616d0000b273e6ee94a174f3fd4dcddfa33a" },
  ]);
};
