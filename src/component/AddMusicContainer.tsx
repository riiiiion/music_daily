import React from "react";
import "../CSS/AddMusicContainer.css"
interface Props {
    setAddMusicContainerFlag:Function
  }
function AddMusicContainer({setAddMusicContainerFlag}:Props) {

    const closeModal = () => {
        setAddMusicContainerFlag(false);
      };

  return (
    <div className="add-music-container-overlay">

    <div className="add-music-container">
      <img src="./logo192.png" alt="" />
      <input type="text" placeholder="曲名" />
      <input type="text" placeholder="歌手" />
      <input type="text" placeholder="演奏日" />
      <input type="text" placeholder="演奏場所" />
      <input type="text" placeholder="BPM" />
      <input type="text" placeholder="主キー" />
      <input type="text" placeholder="曲の長さ" />
      <input type="text" placeholder="コメント" />

      <button onClick={closeModal}>登録</button>
    </div>
    </div>
  );
}

export default AddMusicContainer;
