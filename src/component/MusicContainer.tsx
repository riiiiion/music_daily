import React, { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "../CSS/MusicContainer.css";
import MusicInfo from "./MusicInfo";
import SearchContainer from "./SearchContainer";
import { ServerData } from "../globals";

interface Props {
  musicArr: ServerData[];
  searchWord: string;
 
}

function MusicContainer({ musicArr, searchWord}: Props) {
  const [musicInfoFlag, setMusicInfoFlag] = useState<boolean>(false);
  const [viewObj, setViewObj] = useState<ServerData>(musicArr[1]);

  console.log(musicArr);

  const showMusicInfo= (e:any) => {
    console.log(e);
    setViewObj(e);
    setMusicInfoFlag(true);
  };
  return (
    <>
      <div className="music-container">
        {musicArr
          .filter((elem) => {
            if (searchWord === "") {
              return true;
            }
            return (
              elem.title.indexOf(searchWord) !== -1 ||
              elem.artist.indexOf(searchWord) !== -1
            );
          })

          .map((elm, index) => (
            <div key={index} onClick={()=>showMusicInfo(elm)} className="music-list-item" >
              <img src={elm.track_image? elm.track_image:"./logo192.png"} alt="default" width={70} />

              <span style={{ display: "inline-block" }}>
                <div>
                  {/* <div>music</div> */}
                  <div className="music-title">{elm.title}</div>
                </div>
                <div>
                  {/* <div>artist</div> */}
                  <div className="music-artist">{elm.artist}</div>
                </div>
              </span>
            </div>
          ))}
      </div>
      {musicInfoFlag ? (
        <MusicInfo setMusicInfoFlag={setMusicInfoFlag} viewObj={viewObj} />
      ) : (
        <></>
      )}
    </>
  );
}
export default MusicContainer;
