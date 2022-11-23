import React from 'react';
import "../CSS/MusicInfo.css";

interface Props{
  setMusicInfoFlag:Function
}
function MusicInfo({setMusicInfoFlag}:Props) {

  const closeMusicInfo = ()=>{
    setMusicInfoFlag((prev:boolean)=>!prev)
  }
  return (
    <>
    <div className='music-info-container-overlay'>

        <div className='music-info-container'>
            <div>
                <img src="logo192.png" alt="default" />
            </div>
            <p>music</p>
            <div>{"music"}</div>
            <p>artist</p>
            <div>{"artist"}</div>
            <p>演奏日</p>
            <div>{}</div>
            <p>演奏場所</p>
            <div>{}</div>
            <p>楽曲情報</p>
            <div>{}</div>
            <ul>
                <li>BPM: {}</li>
                <li>主キー: {}</li>
                <li>曲の長さ: {}</li>
            </ul>
            <p>コメント</p>
            <div>{}</div>
            <button onClick={closeMusicInfo}>閉じる</button>
        </div>    
    </div>
    </>
  )
}

export default MusicInfo;