import React, { useRef, useState } from "react";
import "../CSS/AddMusicContainer.css";
import { ServerData } from "../globals";
import axios, { AxiosResponse } from "axios";
interface Props {
  setAddMusicContainerFlag: Function;
  setMusicArr: Function;
  token: null | string;
  userId: number;
}

interface searchMusic {
  id: string;
  title: string;
  artist: string;
  track_image: string;
}
interface ServerData2 {
  userId: number;
  musicId: string;
  title: string;
  artist: string;
  duration_ms: number | string;
  track_image: string;
  bpm: number | string;
  main_key: string;
  date: string | null;
  location: string | null;
  url: string | null;
  comment: string | null;
}
const keyArr = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
];

function AddMusicContainer({
  setAddMusicContainerFlag,
  setMusicArr,
  token,
  userId,
}: Props) {
  const searchMusicObj: ServerData2 = {
    userId: 0,
    title: "",
    musicId: "",
    artist: "",
    duration_ms: "",
    track_image: "logo192.png",
    bpm: "",
    main_key: "",
    date: null,
    location: null,
    url: null,
    comment: null,
  };

  const titleRef = useRef<HTMLInputElement>(null!);

  const [titleSearchArr, setTitleSearchArr] = useState<searchMusic[]>([]);
  const [getMusicObj, setGetMusicObj] = useState<ServerData2 | null>();
  const [timer, setTimer] = useState<number>(0);

  const [idSearchResult, setIdSearchResult] = useState(searchMusicObj);
  const closeModal = () => {
    setAddMusicContainerFlag(false);
  };
  const addMusicObj: ServerData = {
    userId: 0,
    title: "",
    artist: "",
    duration_ms: null,
    track_image: "logo192.png",
    bpm: null,
    main_key: null,
    date: null,
    location: null,
    url: null,
    comment: null,
  };
  type ReduceType = {
    title: string;
    artist: string;
  };

  const searchMusic = (val: string) => {
    clearTimeout(timer);
    const newTimer = window.setTimeout(() => {
      if (val !== "") {
        axios(`https://api.spotify.com/v1/search`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: val,
            type: "track",
            limit: 20,
          },
        }).then((res: AxiosResponse) => {
          // console.log(res);
          const arr = [];
          for (const elem of res.data.tracks.items) {
            arr.push({
              title: elem.name,
              artist: elem.artists[0].name,
              id: elem.id,
              track_image: elem.album.images[0].url,
            });
          }
          console.log(arr);
          setTitleSearchArr(arr);
          // console.log(arr);
        });
      }
    }, 500);

    setTimer(newTimer);
  };

  const idSearch = (elem: searchMusic) => {
    axios(`https://api.spotify.com/v1/audio-analysis/${elem.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: AxiosResponse) => {
      console.log(res.data);
      setIdSearchResult((prev) => {
        titleRef.current.value = elem.title;
        setGetMusicObj({
          userId: 0,
          musicId: String(elem.id),
          title: elem.title,
          artist: elem.artist,
          duration_ms: res.data.track.duration,
          track_image: elem.track_image,
          bpm: res.data.track.tempo,
          main_key: keyArr[Number(res.data.track.key)],
          date: null,
          location: null,
          url: null,
          comment: null,
        });

        return {
          ...prev,
          duration_ms: res.data.track.duration,
          bpm: res.data.track.tempo,
          title: elem.title,
          artist: elem.artist,
          main_key: res.data.track.key,
        };
      });
    });
  };

  return (
    <div className="add-music-container-overlay">
      <div className="search-and-music-container">
        <span className="add-music-container">
          {/* <img src={"./logo192.png"} alt="" /> */}
          <img
            src={getMusicObj ? getMusicObj.track_image : "./logo192.png"}
            alt=""
            className="select-track-image"
          />
          <input
            type="text"
            placeholder="曲名"
            ref={titleRef}
            // value={idSearchResult.title===""?"":idSearchResult.title}
            onChange={(e) => {
              searchMusic(e.target.value);
              addMusicObj.title = e.target.value;
            }}
          />
          <input
            type="text"
            placeholder="歌手"
            value={idSearchResult.artist === "" ? "" : idSearchResult.artist}
            onChange={(e) => (addMusicObj.artist = e.target.value)}
          />
          <input
            type="text"
            placeholder="BPM"
            value={idSearchResult.bpm === "" ? "" : idSearchResult.bpm}
            onChange={(e) => (addMusicObj.bpm = Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="主キー"
            value={
              idSearchResult.main_key === ""
                ? ""
                : keyArr[Number(idSearchResult.main_key)]
            }
            onChange={(e) => (addMusicObj.main_key = e.target.value)}
          />
          <input
            type="text"
            placeholder="曲の長さ"
            value={
              idSearchResult.duration_ms === ""
                ? ""
                : idSearchResult.duration_ms
            }
            onChange={(e) => (addMusicObj.duration_ms = Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="演奏日"
            onChange={(e) => (addMusicObj.date = e.target.value)}
          />
          <input
            type="text"
            placeholder="演奏場所"
            onChange={(e) => (addMusicObj.location = e.target.value)}
          />
          <input
            type="text"
            placeholder="コメント"
            onChange={(e) => (addMusicObj.comment = e.target.value)}
          />

          <button
            onClick={() => {
              console.log(addMusicObj);
              //addMusicObjをdbにpostする処理を書く
              setMusicArr((prev: ServerData[]) => [
                ...prev,
                {
                  ...getMusicObj,
                  comment: addMusicObj.comment,
                  date: addMusicObj.date,
                  location: addMusicObj.location,
                } || addMusicObj,
              ]);
              const newObj = {
                // ...getMusicObj,
                // comment: addMusicObj.comment,
                // date: addMusicObj.date,
                // location: addMusicObj.location,
                // musicId:"dsdsdsdsdsd"

                userId: String(userId),
                title: getMusicObj?.title,
                musicId: getMusicObj?.musicId,
                artist: getMusicObj?.artist,
                duration_ms: "1",
                track_image: getMusicObj?.track_image,
                bpm: String(getMusicObj?.bpm),
                main_key: null,
                date: "20221013",
                location: "ANJO",
                url: null,
                comment: "Good",
              };
              console.log(newObj);
              axios.post("/", newObj);
              closeModal();
            }}
          >
            登録
          </button>
        </span>
        <span className="music-search-result">
          <span className="round_btn" onClick={() => closeModal()}></span>
          {titleSearchArr.map((elem, index) => {
            return (
              <div
                key={index}
                onClick={() => idSearch(elem)}
                className="music-search-item"
              >
                <img
                  src={elem.track_image}
                  alt="track_image"
                  className="track-image"
                />
                <span>
                  <div>{elem.title}</div>
                  <div>{elem.artist}</div>
                </span>
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default AddMusicContainer;
