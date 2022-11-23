export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000";
const clientId = "c6024a4d60b647c7a72a9b91396b6b43";

// 対応する範囲を決める
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];
type ReduceReturnType = Record<string, string>;
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce<ReduceReturnType>((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

// SpotifyのログインページのURL
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
