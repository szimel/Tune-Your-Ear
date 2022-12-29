import { chosenNotes } from "./perfect-pitch-quiz";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAnswer } from "../../actions";
import '../../css/general.css'
import { useNavigate } from "react-router-dom";
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
var _ = require('lodash');



//object with data needed for note playback
var chosenAudio = {
  noNoteTwice: null
};
var sessionData = {//stores all data for dispatch
  date: null,
  time: null,
  results: []
};
var correctUserAnswer = {
  jsx: null
};
//var that sets the names of the three buttons 
var buttons = {
  options: ['this', 'dummy', 'fillers'],
  random: [0, 1, 2],
  run: true,
};


const Forms = () => {
  let refOne = React.createRef();
  let refTwo = React.createRef();
  let refThree = React.createRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //returns logged out user to home page
  // const authenticated = useSelector(state => state.auth);
  // if(!authenticated.authenticated) {
  //   return navigate("/perfect-pitch/session", { replace: true });
  // }
  


  //determine if user answer is correct and make backend call
  const handleFormSubmit = (e) => {
    //so only one answers is submitted
    if(buttons.run === false) {
      return null;
    };
    //reset buttons 
    handleShow();
    //clear input
    //update session data global var
    if (chosenAudio.answer === e.target.innerText) {
      const data = {
        note: chosenAudio.answer, correct: 1
      };
      results(true, chosenAudio.answer);
      e.target.setAttribute('id', 'button-right')
      return sessionData.results.push(data), buttons.run = false;
    } else {
      const data = {
        note: chosenAudio.answer, correct: 0
      };
      e.target.setAttribute('id', 'button-wrong')
      results(false, chosenAudio.answer);
      return sessionData.results.push(data), buttons.run = false;
    };
  };

  //logic for play and replay button
  const [show, setShow] = useState(true);
  const [Show, SetShow] = useState(false);
  const [done, setDone] = useState(false)
  const [Button, setButton] = useState(false);
  const handleDone = () => setDone(true);
  const handleButtonShow = () => {
    setButton(true);
    refOne.current.setAttribute('id', 'button-general');
    refTwo.current.setAttribute('id', 'button-general');
    refThree.current.setAttribute('id', 'button-general');
  };
  // const handleButtonsClose = () => {
  //   setButton(false);
  // }
  const handleShow = () => {
      setShow(true);
      SetShow(false);
  };
  const handleClose = () => {
    setShow(false);
    SetShow(true);
  };

  //function to determine note 
  const chooseAudio = () => {
    const options = Object.keys(chosenNotes);

    //more than one note selected
    if(options.length < 3) {
      return alert('Please select at least three notes!');
    };

    //gives 0 or 1 for audio playing function
    const rand = Math.round(Math.random())

    //gives random number between 0 and options values
    const max = Math.floor(options.length -1);
    const random = Math.floor(Math.random() * (max - 0 + 1)) + 0;

    //grabs audio files of rand chosen note and give it to global var
    const chosen = chosenNotes[options[random]];//assigns audio to chosen
    chosenAudio.files = chosen; //audio files
    chosenAudio.randNum = rand; //rand num 0 or 1
    chosenAudio.answer = options[random]; //correct note name
    buttons.run = true;//so that the handleFormSubmit runs
    setButtons();//puts three notes w correct in array
    handleClose(); //switches buttons play to replay
    handleButtonShow();//shows options buttons
    handleDone(); //switches buttons play to replay
    playAudio(); //plays the actual sound
    results(null);//so 'answer was wrong' goes away

  };

  //sets three user options to choose from 
  const setButtons = () => {
    let notes = Object.keys(chosenNotes);
    let idk =_.sampleSize(notes, 2)//grabs two wrongs notes
    let threeNums = _.sampleSize([0, 1, 2], 3);//randomly chooses three random
    //re runs if wrong two contain answer
    if(idk[1] === chosenAudio.answer || idk[0] === chosenAudio.answer) {
      return setButtons();
    };
    idk.push(chosenAudio.answer);
    return buttons.options = idk, buttons.random = threeNums;
  };

  //simple play audio function
  const playAudio = () => {
    //doesn't play same note twice code
    if(chosenAudio.answer === chosenAudio.noNoteTwice) {
      chooseAudio();//re calls chooseAudio so that no note is played twice
    };
    let audioFiles = chosenAudio.files;
    //stores note just played 
    chosenAudio.noNoteTwice = chosenAudio.answer;
    audioFiles[chosenAudio.randNum].play();
  };

  //same note played twice code was messing up so replay gets its own function
  const replayAudio = () => {
    let audioFiles = chosenAudio.files;
    //stores note just played 
    chosenAudio.noNoteTwice = chosenAudio.answer;
    audioFiles[chosenAudio.randNum].play();
  };

  const results = (e, note) => {
    if(e === true){
      const jsx = <p>Your answer was correct!</p>
      return correctUserAnswer.jsx = jsx;
    } else if (e === false) {
      const jsx = <p>Incorrect, the note played was {note}</p>;
      return correctUserAnswer.jsx = jsx;
    } else if(e === null) {
      return correctUserAnswer.jsx = null;
    }
  };

  //so time is added as soon as page is loaded
  const session = () => {
    if(sessionData.results.length === 0) {
      const time = new Date()
      const total = `${time.getMonth() + 1}/${time.getDate()}`
      return sessionData.time = time.getTime(), sessionData.date = total;
    };
  };
  session();

  //handles data for backend 
  const backendCall = () => {
    //calculate time during session
    const time = (new Date().getTime() - sessionData.time)
    const format = {
      time: time,
      date: sessionData.date,
      results: sessionData.results
    };
    dispatch(userAnswer(format, () => {
      navigate("/perfect-pitch/session", { replace: true });
    }));
  }

  //play buttons
  let one = buttons.options[buttons.random[0]];
  let two = buttons.options[buttons.random[1]];
  let three = buttons.options[buttons.random[2]]
  const playButton = <button className='custom-built'onClick={chooseAudio}>Play</button>;
  const replayButton = <button className='custom-built' onClick={replayAudio}>Replay</button>;
  const doneButton = <button className="custom-built" onClick={backendCall}>Done</button>;
  const buttonOne = <button id="button-general" onClick={handleFormSubmit} ref={refOne}>
    {one}</button>;
  const buttonTwo = <button id="button-general" onClick={handleFormSubmit} ref={refTwo}>
    {two}</button>;
  const buttonThree = <button id="button-general" onClick={handleFormSubmit} ref={refThree}>
    {three}</button>;



  return (
    <div id="builder-container" >
     <div className="mx-auto style" style={{width: '500px'}}>
        <p className="font">
          The piano above shows which notes are in the quiz (try clicking <HelpCenterRoundedIcon /> above). Click play to hear a note. Click the done button when you're ready for the quiz to end! 
        </p>
      </div>

      <div className="mx-auto " style={{width: '490px'}}>
        <div>
          {show ? playButton : null}
          {Show ? replayButton: null}
          {done ? doneButton: null}
        </div>
        <div>
          {Button ? buttonOne: null}
          {Button ? buttonTwo: null}
          {Button ? buttonThree: null}
        </div>
          {correctUserAnswer.jsx}
      </div>
    </div>
  );
};


export default Forms;