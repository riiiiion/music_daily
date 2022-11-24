import React, { useRef, useState } from "react";
import "../CSS/AddMusicContainer.css";
import { ServerData } from "../globals";
import axios, { AxiosResponse } from "axios";
interface Props {
  setAddMusicContainerFlag: Function;
  setMusicArr: Function;
  token: null | string;
}

interface searchMusic {
  id: string;
  title: string;
  artist: string;
}
interface ServerData2 {
  userId: number;
  title: string;
  artist: string;
  duration_ms: number|string;
  track_Image: string | null;
  bpm: number | string;
  main_key: string;
  date: string | null;
  location: string | null;
  url: string | null;
  comment: string | null;
};

function AddMusicContainer({
  setAddMusicContainerFlag,
  setMusicArr,
  token,
}: Props) {
  const searchMusicObj: ServerData2 = {
    userId: 0,
    title: "",
    artist: "",
    duration_ms: "",
    track_Image: "logo192.png",
    bpm: "",
    main_key: "",
    date: null,
    location: null,
    url: null,
    comment: null,
  };

  const titleRef = useRef<HTMLInputElement>(null!);

  const [titleSearchArr, setTitleSearchArr] = useState<searchMusic[]>([]);
  

  const [idSearchResult,setIdSearchResult] = useState(searchMusicObj);
  const closeModal = () => {
    setAddMusicContainerFlag(false);
  };
  const addMusicObj: ServerData = {
    userId: 0,
    title: "",
    artist: "",
    duration_ms: null,
    track_Image: "logo192.png",
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
    if (val !== "") {
      axios(`https://api.spotify.com/v1/search`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: val,
          type: "track",
          limit: 10,
        },
      }).then((res: AxiosResponse) => {
        console.log(res);
        const arr = [];
        for (const elem of res.data.tracks.items) {
          arr.push({
            title: elem.name,
            artist: elem.artists[0].name,
            id: elem.id,
          });
        }
        setTitleSearchArr(arr);
        // console.log(arr);
      });
    }
  };

  const idSearch = (elem: searchMusic) => {
    axios(`https://api.spotify.com/v1/audio-analysis/${elem.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: AxiosResponse) => {
      console.log(res.data);
      setIdSearchResult(prev=>{
        titleRef.current.value = elem.title
      return ({
        ...prev,
        duration_ms:res.data.track.duration,
        bpm:res.data.track.tempo,
        title:elem.title,
        artist:elem.artist,
        main_key:res.data.track.key
      })
        
      
      })
    });
  };




  return (
    <div className="add-music-container-overlay">
      <div className="search-and-music-container">
        <span className="add-music-container">
          <img src="./logo192.png" alt="" />
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
            value={idSearchResult.artist===""?"":idSearchResult.artist}
            onChange={(e) => (addMusicObj.artist = e.target.value)}
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
            placeholder="BPM"
            value={idSearchResult.bpm===""?"":idSearchResult.bpm}
            onChange={(e) => (addMusicObj.bpm = Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="主キー"
            value={idSearchResult.main_key===""?"":idSearchResult.main_key}
            onChange={(e) => (addMusicObj.main_key = e.target.value)}
          />
          <input
            type="text"
            placeholder="曲の長さ"
            value={idSearchResult.duration_ms===""?"":idSearchResult.duration_ms}
            onChange={(e) => (addMusicObj.duration_ms = Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="コメント"
            onChange={(e) => (addMusicObj.comment = e.target.value)}
          />

          <button
            onClick={(e) => {
              console.log(addMusicObj);
              //addMusicObjをdbにpostする処理を書く
              setMusicArr((prev: ServerData[]) => [...prev, addMusicObj]);
              closeModal();
            }}
          >
            登録
          </button>
        </span>
        <span>
          {titleSearchArr.map((elem, index) => {
            return (
              <div key={index} onClick={() => idSearch(elem)}>
                <span>{elem.title}</span>
                <span>{elem.artist}</span>
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default AddMusicContainer;
