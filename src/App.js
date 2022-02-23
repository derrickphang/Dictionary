import "./styles.css";
import React, { useState } from "react";

// Word component that when mapped, displays the part of speech and definition of user's word input
function Word({ word }) {
  let meaningsArr = [];
  let wordInput = word.word.toUpperCase();

  for (let i = 0; i < word.meanings.length; i++) {
    let wordDef = [];
    let partOfSpeech = [];
    partOfSpeech = word.meanings[i].partOfSpeech;

    for (let j = 0; j < word.meanings[i].definitions.length; j++) {
      wordDef.push(word.meanings[i].definitions[j].definition);

      partOfSpeech[word.meanings[i].partOfSpeech] = wordDef;
    }

    meaningsArr.push({ key: partOfSpeech, value: wordDef });
  }

  return (
    <div className="wordEach">
      <summary>
        <h3 className="wordHeading">Word: {wordInput}</h3>
      </summary>

      <div>
        {meaningsArr.map((meaning, i) => {
          return (
            <div key={i} className="word">
              <h2>Part of Speech: {meaning.key}</h2> <h3>Definition(s):</h3>
              <ol>
                {" "}
                {meaning.value.map((value, i) => {
                  return (
                    <li key={i} className="listItem">
                      {value}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// NoWord component that gets inserted into html if there is no word found
function NoWord() {
  return <h2>No definitions found</h2>;
}

// Main component
export default function App() {
  const [word, setWord] = useState("");
  const [response, setResponse] = React.useState([]);
  const [display, setDisplay] = useState("");

  function fetchWord() {
    setDisplay(true);
    window.word = word;

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((response) => response.json())
      .then((payload) => {
        setResponse(payload);
      });
  }

  // let textInput = React.createRef();

  // Heading component that displays user input if not empty
  function Heading(props) {
    if (word !== "") {
      window.text = true;
    } else {
      window.text = false;
    }

    return (
      <>
        {window.text ? (
          <>
            <h1>Word: {props.text}</h1>
          </>
        ) : (
          <h1>{props.text}</h1>
        )}
      </>
    );
  }

  // Words component that maps the Word component and displays Word or NoWord.
  function Words() {
    return (
      <>
        {window.text ? (
          <>
            {response.length > 0 ? (
              <div className="container">
                {response.map((c, i) => (
                  <Word key={i} word={c} />
                ))}
              </div>
            ) : (
              <>
                {display ? (
                  <div className="container">
                    <NoWord />
                  </div>
                ) : (
                  <>
                    <h3>Click Submit above to view results</h3>
                  </>
                )}{" "}
              </>
            )}
          </>
        ) : (
          // Do nothing
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Derrick's Online Dictionary</h1>
      <div className="heading">
        <h2 className="enter"> Enter Word: </h2>
        <input
          className="inputText"
          // ref={textInput}
          type="text"
          onChange={(event) => {
            setWord(event.target.value);
            setResponse([]);
            setDisplay(false);
          }}
          value={word}
        />
        <button className="btn" onClick={fetchWord}>
          Submit
        </button>
      </div>

      <>
        <Heading text={word} />
        <Words words={response} />
      </>
    </>
  );
}
