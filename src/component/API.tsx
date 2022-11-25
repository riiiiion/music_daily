import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyLoggedIn from "./SpotifyLoggedIn";
import axios, { AxiosResponse } from "axios";

interface Props {
  token: string | null;
  setToken: Function;
}
const clientId = "c6024a4d60b647c7a72a9b91396b6b43";
const clientSecret = process.env.REACT_APP_SECRET_KEY;
function API({ token, setToken }: Props) {
  const APIfn = () => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
          code: token,
          redirect_uri: "http://localhost:3000",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
        }
      )
      .then((res) => {
        console.log(res.data.access_token);
        setToken(res.data.access_token);
      });
  };

  return (
    <div className="Login">
      {token ? <SpotifyLoggedIn /> : <SpotifyLogin />}
      <button onClick={APIfn}>トークン取得</button>
    </div>
  );
}

export default API;
