import React ,{useState}from "react";
import logo from "./logo.svg";
import AddMusicContainer from "./AddMusicContainer";

interface Props {
  setSearchWord: Function;
  setMusicArr:Function;
  token:null | string;
  userId:number
}
function SearchContainer({setSearchWord, setMusicArr, token,userId}:Props) {
    const [AddMusicContainerFlag,setAddMusicContainerFlag]=useState<boolean>(false)
    // const [searchWord,setSearchWord]=useState<string>("")
    const showModal = () => {
        setAddMusicContainerFlag(true);
      };

const wordSet =(e:React.ChangeEvent<HTMLInputElement>)=>{
  setSearchWord(e.target.value)
}
  
    return (
    <>
      <span className="search-container">
        <input type="text" className="search-input" onChange={wordSet}></input>
      </span>
      <button className="add-music" onClick={showModal}>追加</button>

      {AddMusicContainerFlag?(
        <AddMusicContainer setAddMusicContainerFlag={setAddMusicContainerFlag} setMusicArr={setMusicArr} token={token} userId={userId}/>
      ):
      <></>
      }
    </>
  );
}

export default SearchContainer;
