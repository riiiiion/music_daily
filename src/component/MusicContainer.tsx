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

function MusicContainer({ musicArr, searchWord }: Props) {
  // debugger
  const [musicInfoFlag, setMusicInfoFlag] = useState<boolean>(false);
  const [viewObj, setViewObj] = useState<ServerData>(musicArr[1]);
  // cosnt[(viewObj, setViewObj)] = useState({});

  console.log(musicArr);

  const showMusicInfo= (e:any) => {
    console.log(e);
    // Number(e.target.key)
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
            // <div key={index}  >
            <div key={index} onClick={()=>showMusicInfo(elm)} >
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
        <MusicInfo setMusicInfoFlag={setMusicInfoFlag} viewObj={viewObj} />
      ) : (
        <></>
      )}
    </>
  );
}
// viewObj={viewObj}
export default MusicContainer;
// (property) React.DOMAttributes<HTMLDivElement>.onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
// 型 '(e: MouseEventHandler<Element>) => void' を型 'MouseEventHandler<HTMLDivElement>' に割り当てることはできません。
//   パラメーター 'e' および 'event' は型に互換性がありません。
//     型 'MouseEvent<HTMLDivElement, MouseEvent>' を型 'MouseEventHandler<Element>' に割り当てることはできません。
//       型 'MouseEvent<HTMLDivElement, MouseEvent>' にはシグネチャ '(event: MouseEvent<Element, MouseEvent>): void' に一致するものがありません。ts(2322)