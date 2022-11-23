import React from 'react'
import { accessUrl } from "../spotify/spotify";

function SpotifyLogin() {
  return (
    <div className="Login">
      <h2>ログイン前です</h2>
      <a href={accessUrl}>spotifyへログイン</a>
    </div>
  )
}

export default SpotifyLogin
