import React from "react";
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
  //Lisaのほむらを取得する関数
  const APIfn2 = () => {
    axios(`https://api.spotify.com/v1/search`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "%E7%B4%85%E8%93%AE%E8%8F%AF",
        type: "track",
        limit: 10,
      },
    }).then((res: AxiosResponse) => {
      console.log(res);
    });
  };

  return (
    <div className="Login">
      <button onClick={APIfn}>楽曲取得</button>
      <button onClick={APIfn2}>LISA</button>
    </div>
  );
}

export default API;
