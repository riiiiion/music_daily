import React, { useState } from "react";
import logo from "./logo.svg";
import "../CSS/MusicContainer.css";
import MusicInfo from "./MusicInfo";
import SearchContainer from "./SearchContainer";
import { ServerData } from "../globals";

interface Props {
  musicArr: ServerData[];
  searchWord: string;
}

function MusicContainer({ musicArr, searchWord }: Props) {
  // debugger
  const [musicInfoFlag, setMusicInfoFlag] = useState<boolean>(false);

  console.log(musicArr);

  const showMusicInfo = () => {
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
            <div key={index} onClick={showMusicInfo}>
              <img src="./logo192.png" alt="default" width={70} />

              <span style={{ display: "inline-block" }}>
                <div>
                  <div>music</div>
                  <div>{elm.title}</div>
                </div>
                <div>
                  <div>artist</div>
                  <div>{elm.artist}</div>
                </div>
              </span>
            </div>
          ))}
      </div>
      {musicInfoFlag ? (
        <MusicInfo setMusicInfoFlag={setMusicInfoFlag} />
      ) : (
        <></>
      )}
    </>
  );
}

export default MusicContainer;
