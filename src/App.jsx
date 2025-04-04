import { useState } from 'react';
import './App.css';
import logo from "./assets/images/logo-light-theme.svg";
import lightThemeSelector from "./assets/images/icon-moon.svg";
import darkThemeSelector from "./assets/images/icon-sun.svg"

import Card from './components/Card';

import charCountImage from "./assets/images/pattern-character-count.svg";
import sentenceCountImage from "./assets/images/pattern-sentence-count.svg";
import wordCountImage from "./assets/images/pattern-word-count.svg";

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

function App() {
  const [lightMode, setLightMode] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [characters, setCharacters] = useState({})


  const letterDensity  = (char) =>{
    const cleanedChar =  char.trim().replace(/[^a-z A-Z]/g, "").replace(/\s+/g, "");

    const charObject = {};

    for (let i of cleanedChar){
      charObject[i] = (charObject[i] || 0) + 1; 
    }
    setCharacters(charObject);

    return charObject;
  }

  const letterPercentage = (letter) =>{
    const percentage = (characters[letter] / characterCount * 100).toFixed(2) || 0;
    return percentage;
  }


  const toggleExpand = () => {
    setExpanded(!expanded)
  }
  const changeTheme = () => {
    setLightMode(!lightMode)
  }



  return (
    <div className='screen'>
      <div className='title-bar'>
        <img src={logo} alt="logo"/>
        <img src={lightMode ? lightThemeSelector : darkThemeSelector} alt='theme selector' id='themeSelector' onClick={changeTheme}/>
      </div>

    
    <div className='heading'>
      <h1>Analyze your text in real-time</h1>
    </div>

    <div className='input-textbox'>
      <textarea type="text" placeholder='Start typing here...(or paste your text)' onChange={(e)=>{setCharacterCount(e.target.value.length);  setWordCount(e.target.value.trim().length > 0 ? e.target.value.trim().split(" ").length : 0);  setSentenceCount(e.target.value.trim().length > 0 ? e.target.value.trim().split(/[.?!]+/).filter(Boolean).length : 0); letterDensity(e.target.value)}}/>
    </div>

    <div className='toggle-set'>
      <div className='toggle-container'>
        <div className='toggle-wrapper'>
          <input type="checkbox" name='toggle-space' />
          <label htmlFor="toggle-space">Exclude Spaces</label>
        </div>

        <div className='toggle-wrapper'> 
          <input type="checkbox" name='toggle-char-limit'/>
          <label htmlFor="toggle-char-limit">Set Character Limit</label>
        </div>
      </div>


      <p className='.read-time'>Approx. reading time: 0 minutes</p>

    </div>

    <div className='counter-cards'>
      <Card count={characterCount} title={"Total Characters"} backgroundImage={charCountImage} backgroundColor={"#D3A0FA"}/>
      <Card count={wordCount} title={"Word Count"} backgroundImage={wordCountImage} backgroundColor={"#FF9F00"}/>
      <Card count={sentenceCount} title={"Sentence Count"} backgroundImage={sentenceCountImage} backgroundColor={"#FE8159"}/>
    </div>

    <div id='letter-density' >
      <h3 id='letter-density-title'>Letter Density</h3>

      {Object.keys(characters).length < 1 && "No characters found. Start typing to see letter density."}

      {Object.keys(characters).length > 5 && !expanded ? Object.keys(characters).slice(0, 5).map((char, index)=>{
        return(
          <>
            <div className='letter-density' key={index}> 
            <p className='letter'>{char.toUpperCase()}</p>
            <ProgressBar now={characters[char]} className="custom-progress" style={{ height: "12px", borderRadius: "10px" }}/>
            <p className='percentage'>{characters[char]} ({letterPercentage(char)}%)</p>
            </div>
          </>
        )
      }) : Object.keys(characters).map((char, index)=> {return(
        <div className='letter-density' key={index}> 
          <p className='letter'>{char.toUpperCase()}</p>
          <ProgressBar now={characters[char]} className="custom-progress" style={{ height: "12px", borderRadius: "10px" }}/>
          <p className='percentage'>{characters[char]} ({letterPercentage(char)}%)</p>
        </div>
      )})}
        {Object.keys(characters).length > 5 && (!expanded ? <button type='button' id='toggle-expand' onClick={toggleExpand}>See more <FiChevronDown/></button> : <button type='button' id='toggle-expand' onClick={toggleExpand}>See less <FiChevronUp/></button>)}
    </div>
    </div>
  )
}

export default App
