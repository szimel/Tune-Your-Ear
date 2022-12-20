import { chosenNotes } from "./perfect-pitch-quiz";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAnswer } from "../../actions";
import '../../general.css'
import { useNavigate } from "react-router-dom";


const answerSchema = Yup.object().shape({
  answer: Yup.string().max(2, 'Invalid answer!').required()
});

//object with data needed for note playback
var chosenAudio = {
  noNoteTwice: null
};
var sessionData = {
  results: []
};
var correctUserAnswer = {
  jsx: null
};


const Forms = () => {
  //yup setup for grabbing user answers
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(answerSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //determine if user answer is correct and make backend call
  const handleFormSubmit = (e) => {
    //reset buttons 
    handleShow();
    //update session data global var
    if (chosenAudio.answer === e.answer.toUpperCase()) {
      const data = {
        note: e.answer, correct: 1
      };
      results(true, chosenAudio.answer);
      return sessionData.results.push(data);
    } else {
      const data = {
        note: chosenAudio.answer, correct: 0
      };
      results(false, chosenAudio.answer);
      return sessionData.results.push(data);
    };
  };

  //logic for play and replay button
  const [show, setShow] = useState(true);
  const [Show, SetShow] = useState(false);
  const [done, setDone] = useState(false)
  const handleDone = () => setDone(true);
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
    if(options.length < 2) {
      return alert('Please select at least two notes!');
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
    handleClose(); //switches buttons play to replay
    handleDone(); //switches buttons play to replay
    playAudio(); //plays the actual sound
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
    };
  };

  //so time is added as soon as page is loaded
  const session = () => {
    if(sessionData.results.length === 0) {
      const time = new Date().getTime();
      return sessionData.time = time
    };
  };
  session();

  //handles data for backend 
  const backendCall = () => {
    //calculate time during session
    const time = (new Date().getTime() - sessionData.time)
    const format = {
      time: time,
      results: sessionData.results
    };
    dispatch(userAnswer(format, () => {
      navigate("/perfect-pitch/session", { replace: true });
    }));
  }

  //play buttons
  const playButton = <button className='custom-built'onClick={chooseAudio}>Play</button>;
  const replayButton = <button className='custom-built' onClick={replayAudio}>Replay</button>;
  const doneButton = <button className="custom-built" onClick={backendCall}>Done</button>;



  return (
    <div id="builder-container" >
      <div className="mx-auto style" style={{width: '380px'}}>
        <p className="font">
          Highlighted piano keys will appear in quiz!
        </p>
      </div>
      <div className="mx-auto " style={{width: '490px'}}>
      <div>
        {show ? playButton : null}
        {Show ? replayButton: null}
        {done ? doneButton: null}

      </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="did-floating-label-content">
          <input className="did-floating-input" type="text" placeholder=" " {...register('answer', {required: true})}/><p id="error"><em>{errors.answer?.message}</em></p>
          <label className="did-floating-label">Your Answer</label>
        </div>
          <button className="custom-built " type="submit" style={{display: Show ? 'block' : 'none'}}>Submit</button>
        </form>
        {correctUserAnswer.jsx}
      </div>
    </div>
  );
};


export default Forms;