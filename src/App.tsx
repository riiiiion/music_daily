import React, { useState } from "react";
import logo from "./logo.svg";
import "./CSS/App.css";
import MainContainer from "./component/MainContainer";
import MusicInfo from "./component/MusicInfo";
import axios, { AxiosResponse } from "axios";
import {ServerData} from "./globals"

//test
function App() {
  // const [musicInfoFlag, setMusicInfoFlag] = useState<boolean>(false);
  const [musicArr, setMusicArr] = useState<ServerData[]>([]);

  const loginFn = (): void => {
    axios
      .get(`${process.env.PUBLIC_URL}/sample_data/1.json`)
      .then((res: AxiosResponse) => {
        console.log(res.data.favoriteList);
        setMusicArr(res.data.favoriteList);
      });
  };
  return (
    <>
<div className="page-container">
          <div className="page-header">
            <h1 className="title" style={{ display: "inline-block" }}>My favorite songs</h1>
            <div className="">

            <select　className="user-select-box" name="ユーザー名" onChange={loginFn}>
              <option hidden>ユーザーを選択してください</option>
              <option value={1}>じゅんじ</option>
              <option value={2}>まっすー</option>
              <option value={3}>なみ</option>
              <option value={4}>りおん</option>
            </select>
            </div>
          </div>
          <MainContainer musicArr={musicArr} setMusicArr={setMusicArr}/>
</div>

    </>
  );
}

export default App;
