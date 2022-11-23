// const { Knex } = require("knex");
// const config = require("../../knexfile")
const { generateKeySync } = require("crypto");
const knex = require("../../knex");

module.exports = {
  getAll(num){
    return knex("users")
      .join("mylist","mylist.user_id","users.id")
      .join("music","music.id","mylist.music_id")
      .select()
      .where({
        "users.id" :num
      })
      .then(res => {
        const retArray =  res.map(obj => ({
          userId: obj.user_id,
          title: obj.Title,
          musicId: obj.music_id,
          artist: obj.Artist,
          duration_ms: obj.duration,
          track_image: obj.img,
          bpm: obj.tempo,
          main_key: obj.key,
          date: obj.date,
          location: obj.place,
          url: obj.URL,
          comment: obj.comment
        }));
        return retArray;
      })
  },

  postMyList(obj){
    const newMusic = {
        id: obj.musicId,
        Title: obj.title,
        Artist: obj.artist,
        key: obj.main_key,
        tempo: obj.bpm,
        duration: obj.duration_ms,
        img: obj.track_image,
        URL: obj.url
    }

    return knex("music")
    .select()
    .where({
      "music.id":newMusic.id
    })
    .first()
    .then(async res => {
      if(!res){
        await knex("music").insert(newMusic);
      }
    })
    .then((res, err) => {
      const newMyList = {
        user_id: obj.userId,
        music_id: obj.musicId,
        date: obj.date,
        place: obj.location,
        comment: obj.comment
      }
      return knex("mylist").insert(newMyList);
    }).catch(err => err);
  }

}