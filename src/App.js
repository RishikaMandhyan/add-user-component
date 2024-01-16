
import Avatar from 'react-avatar';
import { useState, useRef } from "react";

import { useData } from "./hooks/useData";

import { UserList } from "./components/UserList";

import "./App.css";

export default function App() {

  //search query state variable
  const [query, setQuery] = useState("");
  //state variable for array of chips
  const [chips, setChips] = useState([]);
  //state variable to store all unique ids of chips in a set
  const [chipsSet, setChipsSet] = useState(new Set());
  //state variable to decide whether or not to show the userlist component
  const [show, setShow] = useState(false);
  //state variable to store the id of the last element in chips array for backspace functionality
  const [id, setId] = useState(-1);

  const inputRef = useRef(null);

  //custom hook for api call
  const { data, setData } = useData(query, 1);

  function handleClick(item, index) {
    inputRef.current.focus();
    const newSet = new Set([...chipsSet]);
    newSet.add(item.id);
    setChipsSet(newSet);
    setChips([...chips, item]);
  }

  function handleCancel(Id) {
    inputRef.current.focus();
    const newChips = chips.filter((item) => item.id != Id);
    const newSet = new Set([...chipsSet]);
    newSet.delete(Id);
    setChipsSet(newSet);
    setChips(newChips);
    if (Id === id) setId(-1);
  }


  //debounce function to avoid/delay api calls at every key press in search functionality
  let timer;

  function debounce(e) {
    if (e.key === "Backspace" && e.target.value == "") {
      if (id === -1 && chips.length > 0) {
        setId(chips[chips.length - 1].id);
      } else if (id !== -1) {
        handleCancel(id);
        setId(-1);
      }
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(e.target.value);
    }, 500);
  }

  return (
    <div className="App">
      <h1>Pick Users</h1>
      <div className="chips">
        {chips.map((item) => {
          return (
            <div className={`chipItem${item.id === id ? " focus" : ""}`}>
              <Avatar name={`${item.firstName} ${item.lastName}`} size="30" round/>
              <span>{`${item.firstName} ${item.lastName}`}</span>
              <span class="material-symbols-outlined" style={{cursor: "pointer"}}onClick={() => handleCancel(item.id)}>
              close
              </span>
            </div>
          );
        })}
        <div className="inputContainer">
          <input
            type="text"
            ref={inputRef}
            onKeyDown={debounce}
            onFocus={() => {
              setShow(true);
            }}
            onBlur={() => {
              setShow(false);
            }}
            className="search"
            placeholder="Add new user..."
          />
          {show ? (
            <UserList data={data} chipsSet={chipsSet} handleClick={handleClick} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
