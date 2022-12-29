import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chordUserAnswer } from '../../actions';
import '../../css/general.css'
import { chosenNotes } from './chord-piano';

var _ = require('lodash');

//NEED 
//*Function gets called when done is clicked = puts correct data into store
//*Function that manages data so it is correct format for done being called


//single global var for data management
var info = {
  noNoteTwice: null,
  buttonOptions: [],//sets three buttons values
  chosenChord: null,//value of chosen audio file 
  correctChord: null,//value of chosen note ex "A#"
  session: [],//holds all the data 
  didRun: false,
  time: null
}


const Answer = () => {

  const run = () => {
    console.log(info.session);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //logic for play, replay, done buttons
  const [play, setPlay] = useState(true);
  const handlePlayShow = () => {
    if(play === true) {
      return setPlay(false);
    } else {
      return setPlay(true);
    }
  };

  const [replay, setReplay] = useState(false);
  const handleReplayShow = () => {
    if(replay === true) {
      return setReplay(false);
    } else {
      return setReplay(true);
    }
  };

  const [done, setDone] = useState(false);
  const handleDoneShow = () => {
    setDone(true)
  };

  const[button, setButton] = useState(false)
  const handleButtonShow = () => {
    setButton(true)
  }
  const handleButtonsHide = () => {
    setButton(false)
  }



  //first funtion play button calls - randomy chooses audio - calls and sets up everything else
  //NEEDS TO * assign audio & file to global var
  const chooseAudio = () => {
    info.didRun = false;
    const keys = Object.keys(chosenNotes);


    //sets min chord selection
    if(keys.length < 3) {
      return alert('Please select at least three chords!');
    };

    //gives random number between 0 and options values
    const max = Math.floor(keys.length -1);
    const random = Math.floor(Math.random() * (max - 0 + 1)) + 0;

    const chosenChord = chosenNotes[keys[random]];//audio file
    const correctChord = keys[random];//name like "C"
    info.chosenChord = chosenChord;//for replay button
    info.correctChord  = correctChord//for setting buttons color (rightOrWrong)


    //plays chord as long as it isn't twice in a row
    if(correctChord === info.noNoteTwice) {
      return chooseAudio();
    };
    chosenChord.play()
    info.noNoteTwice = correctChord//sets it up for next cycle

    //handles all the buttons showing correctly
    handlePlayShow();
    handleDoneShow();
    handleReplayShow();
    handleButtonShow();

    //buttons for user options
    setbuttons(correctChord);
    rightOrWrong(true);
  };

  const setbuttons = (note) => {
    let keys = Object.keys(chosenNotes);
    //takes out correct note from key array
    const index = keys.indexOf(note)
    keys.splice(index, 1);
    //randomly chooses two other notes using lodash
    let predictable =_.sampleSize(keys, 2);//grabs two wrongs notes 
    predictable.push(note);

    let unpredictable = _.sampleSize(predictable, 3);//randomizes order

    return info.buttonOptions = unpredictable
  };

  //


  //simple simple replay button
  const replayAudio = () => {
    info.chosenChord.play();
  };

  const onClick = (e) => {
    formatData(e);
    rightOrWrong();
  }

  //sets colors of buttons
  const rightOrWrong = (e) => {
    const one = document.getElementsByName('button-one');
    const two = document.getElementsByName('button-two');
    const three = document.getElementsByName('button-three');
    const array = [one[0], two[0], three[0]];
    array.map(p => {
      if(p.innerHTML === info.correctChord) {
        p.setAttribute('id', 'button-right')
      } else {
        p.setAttribute('id', 'button-wrong');
      };
    });
    if (e === true) {
      array.map(p => {
        return p.setAttribute('id', 'button-general');
      });
    }
  };


  //stores data in array until done button hit
  const formatData = (e) => {
    if(info.didRun === true) {
      return null;
    }
    if(e.target.innerHTML === info.correctChord) {
      info.session.push({chord: info.correctChord, correct: 1});
    } else {
      info.session.push({chord: info.correctChord, correct: 0});
    };
    handlePlayShow()//makes play button return 
    handleReplayShow()//hides replay button
    info.didRun = true
  };

    //so time is added as soon as page is loaded
    const session = () => {
      if(info.session.length === 0) {
        const time = new Date()
        const total = `${time.getMonth() + 1}/${time.getDate()}`
        return info.time = time.getTime(), info.date = total;
      };
    };
    session();

  const backendCall = () => {
    const time = (new Date().getTime() - info.time);
    const format = {
      time: time,
      date: info.date,
      results: info.session
    };
    dispatch(chordUserAnswer(format, () => {
      navigate("/chords/session", { replace: true });
    }));
  };


  //play, replay, done buttons
  const playButton = <button className='custom-built' onClick={chooseAudio}>Play</button>;
  const replayButton = <button className='custom-built' onClick={replayAudio}>Replay</button>;
  const doneButton = <button className="custom-built" onClick={backendCall}>Done</button>;

  //three ui button options
  const buttonOne = <button id="button-general" name='button-one' onClick={onClick}>
  {info.buttonOptions[0]}</button>;
const buttonTwo = <button id="button-general" name='button-two' onClick={onClick}>
  {info.buttonOptions[1]}</button>;
const buttonThree = <button id="button-general" name='button-three' onClick={onClick}>
  {info.buttonOptions[2]}</button>;
  return (
    <div id="builder-container" >
     <div className="mx-auto style" style={{width: '500px'}}>
      <p>ill eventually make it make sense</p>
      <div className="mx-auto " style={{width: '490px'}}>
        <div>
          {play ? playButton : null}
          {replay ? replayButton : null}
          {done ? doneButton : null}
        </div>
        <div>
          {button ? buttonOne : null}
          {button ? buttonTwo : null}
          {button ? buttonThree :null}
        </div>
        <p onClick={run}>TeSTER</p>
      </div>
    </div>
  </div>
  )
};

export default Answer;