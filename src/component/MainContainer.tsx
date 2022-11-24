import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import SearchContainer from "./SearchContainer";
import MusicContainer from "./MusicContainer";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyLoggedIn from "./SpotifyLoggedIn";
import API from "./API";

import { getTokenFromUrl } from "../spotify/spotify";
import { ServerData } from "../globals";
import axios from "axios";

interface Props {
  musicArr: ServerData[];
  setMusicArr: Function 
}

function MainContainer({ musicArr, setMusicArr }: Props) {
  const [token, setToken] = useState<null | string>(null);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    const hash = getTokenFromUrl();
    console.log(hash);
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      console.log(token);
      setToken(token);
      
    }
  }, []);

  return (
    <div className="main-container">
      <div className="main-container-head">
        <SearchContainer setSearchWord={setSearchWord} setMusicArr={setMusicArr} token={token}/>
      </div>
      <MusicContainer musicArr={musicArr} searchWord={searchWord} />
      {token ? <SpotifyLoggedIn /> : <SpotifyLogin />}
      <API token={token} setToken={setToken}/>
    </div>
  );
}

export default MainContainer;
