import { chosenNotes } from "./perfect-pitch-quiz";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAnswer } from "../../actions";
import '../../general.css'


const answerSchema = Yup.object().shape({
  answer: Yup.string().max(2, 'Invalid answer!').required()
});

//object with data needed for note playback
var chosenAudio = {};
var sessionData = {};


const Forms = () => {
  //yup setup for grabbing user answers
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(answerSchema)
  });

  const dispatch = useDispatch()


  //determine if user answer is correct and make backend call
  const handleFormSubmit = (e) => {
    //reset buttons 
    handleShow();
    if(chosenAudio.answer === e.answer.toUpperCase()) {
      const data = {
        note: chosenAudio.answer, correct: true
      };
      // // backend call
      // dispatch(userAnswer(data));
      //UI wrong or right
      results(true);

    } else {
      const data = {
        note: chosenAudio.answer, correct: false
      };
      dispatch(userAnswer(data));
      results(false, chosenAudio.answer);
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
  }
  // const toggleMenu = () => {
  //   // toggle the current state
  //   setShow(current => !current);
  //   SetShow(current => !current);
  // };


  //function to determine note 
  const chooseAudio = () => {
    const options = Object.keys(chosenNotes)

    //gives 0 or 1 for audio playing function
    const rand = Math.round(Math.random())

    //gives random number between 0 and options values
    const random = Math.round((Math.random() * (options.length - 1)));

    //grabs audio files of rand chosen note and give it to global var
    const chosen = chosenNotes[options[random]];
    return chosenAudio.files = chosen, chosenAudio.randNum = rand, chosenAudio.answer = options[random];
  };

  //simple play audio function
  const playAudio = () => {
    if(chosenAudio.files === undefined) {
      alert('Please highlight piano notes!')
    };
    let audioFiles = chosenAudio.files
    audioFiles[chosenAudio.randNum].play();
  };


  //groups multiple calls
  function onClick() {
    chooseAudio();
    playAudio();
    handleClose();
    handleDone();
  };

  const results = (e, note) => {
    if(e === true) {
      console.log('true');
      return <p>Correct!</p>;
    } else if (e === false) {
      console.log('false');
      return <p>Incorrect, {note} was the answer.</p>;
    } else {
      return null;
    };
  };

  const session = (e) => {

  };

  const playButton = <button className='custom-built'onClick={onClick}>Play</button>;
  const replayButton = <button className='custom-built' onClick={playAudio}>Replay</button>;
  const doneButton = <button className="custom-built">Done</button>;


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
          <div>{results()}</div>
        </form>
      </div>
    </div>
  );
};


export default Forms;