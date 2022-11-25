import React from "react";
import "../CSS/MusicInfo.css";
import { ServerData } from "../globals";

interface Props {
  setMusicInfoFlag: Function;
  viewObj: ServerData;
}
function MusicInfo({ setMusicInfoFlag, viewObj }: Props) {
  const closeMusicInfo = () => {
    setMusicInfoFlag((prev: boolean) => !prev);
  };
  return (
    <>
      <div className="music-info-container-overlay">
        <div className="music-info-container">
          <div>
            <img src={viewObj.track_image===null?"logo192.png":viewObj.track_image} alt="default" className="info-image" />
          </div>
          <p>music</p>
          <div>{viewObj.title}</div>
          <p>artist</p>
          <div>{viewObj.artist}</div>
          <p>演奏日</p>
          <div>{viewObj.date}</div>
          <p>演奏場所</p>
          <div>{viewObj.location}</div>
          <p>楽曲情報</p>

          <ul>
            <li>BPM: {viewObj.bpm}</li>
            <li>主キー: {viewObj.main_key}</li>
            <li>曲の長さ: {viewObj.duration_ms}</li>
          </ul>
          <p>コメント</p>
          <div>{viewObj.comment}</div>
          <button onClick={closeMusicInfo}>閉じる</button>
        </div>
      </div>
    </>
  );
}

export default MusicInfo;
