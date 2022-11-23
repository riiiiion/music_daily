import React from "react";
import axios, { AxiosResponse } from "axios";

interface Props {
  token: string | null;
}

function API({ token }: Props) {
  const APIfn = () => {
    axios(`https://api.spotify.com/v1/artists/1EowJ1WwkMzkCkRomFhui7`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: AxiosResponse) => {
      console.log(res);
    });
  };
  // const APIfn = () => {
  //   axios(
  //     `https://api.spotify.com/v1/search`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params:{
  //         q: "%E7%B4%85%E8%93%AE%E8%8F%AF",
  //         type: "track",
  //         limit: 10
  //       }
  //     }
  //   ).then((res: AxiosResponse) => {
  //     console.log(res);
  //   });
  // };

  return (
    <div className="Login">
      <button onClick={APIfn}>楽曲取得</button>
    </div>
  );
}

export default API;
