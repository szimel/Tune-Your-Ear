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


const Forms = () => {
  //yup setup for grabbing user answers
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(answerSchema)
  });

  const dispatch = useDispatch()


  //determine if user answer is correct and make backend call
  const handleFormSubmit = (e) => {
    console.log(chosenAudio.answer)
    if(chosenAudio.answer === e.answer.toUpperCase()) {
      const data = {
        note: chosenAudio.answer, correct: true
      };
      //reset buttons
      toggleMenu();
      // backend call
      dispatch(userAnswer(data));
      //UI wrong or right
      results(true);

    } else {
      const data = {
        note: chosenAudio.answer, correct: false
      };
      toggleMenu();
      dispatch(userAnswer(data));
      results(false, chosenAudio.answer);
    };
  };

  //logic for play and replay button
  const [show, setShow] = useState(true);
  const [Show, SetShow] = useState(false);
  const toggleMenu = () => {
    // toggle the current state
    setShow(current => !current);
    SetShow(current => !current);
  };


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
    let audioFiles = chosenAudio.files
    audioFiles[chosenAudio.randNum].play();
  };


  //groups multiple calls
  function onClick() {
    chooseAudio();
    playAudio();
    toggleMenu();
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
    }
  }


  return (
    <div id="builder-container" >
      <div className="mx-auto style" style={{width: '490px'}}><p className="font">
      Click on the piano above to add or remove notes from quiz!
      </p></div>
      <div className="mx-auto " style={{width: '490px'}}>
        <div>
        <button className='btn btn-outline-secondary mx-auto' onClick={onClick}
        style={{display: show ? 'block' : 'none'}}>Play</button>
        <button className='btn btn-outline-secondary mt-3 mx-auto' onClick={playAudio} style={{display: Show ? 'block' : 'none'}}>Replay</button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label>
            Your Answer:
          </label>
          <br/>
          <input className="Style"{...register('answer', {required: true})}></input>
          <button className="btn btn-outline-secondary " type="submit">Submit</button>
          <br/>
          {errors.answer?.message}
          <div>{results()}</div>
        </form>
      </div>
    </div>
  );
};


export default Forms;