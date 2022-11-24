const path = require("path");
const express = require("express");
const app = express();
const musicModel = require("./src/getAPI/music.model");
const knex = require("./knex");

app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello, Top page!");
});

app.get("/music/:id", async(req, res) => {
  const result = await musicModel.getAll(req.params.id);
  if(result.length === 0){
    res.status(404).end();
  }else {
    res.json(result).status(200).end();
  }
});

app.post("/",async(req,res) => {
  // {
  //   "userId": "1",
  //     "title": "abcdefg",
  //       "musicId": "13",
  //         "artist": "あいみょん",
  //           "duration_ms": "1",
  //             "track_image": null,
  //               "bpm": "120",
  //                 "main_key": null,
  //                   "date": "20221013",
  //                     "location": "ANJO",
  //                       "url": null,
  //                         "comment": "Good"
  // }

  const retobj = await musicModel.postMyList(req.body);
  const retSele = await knex("mylist")
    .select("*")
    .where({"user_id": req.body.userId})
    .andWhere({"music_id": req.body.musicId});
  if (!retSele) {
    res.status(400).end();
  } else {
    res.status(200).end();
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
