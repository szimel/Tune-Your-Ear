import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const answerSchema = Yup.object().shape({
  answer: Yup.string().max(2, 'Invalid answer!').required()
});

var num;

const Test = () => {
  //yup setup for grabbing user answers
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(answerSchema)
  });


  //creates audio file
  const audioSetup = {
    A1: new Audio('/notes/A-1.mp3'),
    A2: new Audio('/notes/A-2.mp3'),
    AS1: new Audio('/notes/AS-1.mp3'),
    AS2: new Audio('/notes/AS-2.mp3'),
    B1: new Audio('/notes/B-1.mp3'),
    B2: new Audio('/notes/B-2.mp3'),
    C1: new Audio('/notes/C-1.mp3'),
    C2: new Audio('/notes/C-2.mp3'),
    CS1: new Audio('/notes/CS-1.mp3'),
    CS2: new Audio('/notes/CS-2.mp3'),
    D1: new Audio('/notes/D-1.mp3'),
    D2: new Audio('/notes/D-2.mp3'),
    DS1: new Audio('/notes/DS-1.mp3'),
    DS2: new Audio('/notes/DS-2.mp3'),
    E1: new Audio('/notes/E-1.mp3'),
    E2: new Audio('/notes/E-2.mp3'),
    F1: new Audio('/notes/F-1.mp3'),
    F2: new Audio('/notes/F-2.mp3'),
    FS1: new Audio('/notes/FS-1.mp3'),
    FS2: new Audio('/notes/FS-2.mp3'),
    G1: new Audio('/notes/G-1.mp3'),
    G2: new Audio('/notes/G-2.mp3'),
    GS1: new Audio('/notes/GS-1.mp3'),
    GS2: new Audio('/notes/GS-2.mp3')
  };


  //puts into simple form for function
  const audio = [
    audioSetup.A1,
    audioSetup.A2,
    audioSetup.AS1,
    audioSetup.AS2,
    audioSetup.B1,
    audioSetup.B2,
    audioSetup.C1,
    audioSetup.C2,
    audioSetup.CS1,
    audioSetup.CS2,
    audioSetup.D1,
    audioSetup.D2,
    audioSetup.DS1,
    audioSetup.DS2,
    audioSetup.E1,
    audioSetup.E2,
    audioSetup.F1,
    audioSetup.F2,
    audioSetup.FS1,
    audioSetup.FS2,
    audioSetup.G1,
    audioSetup.G2,
    audioSetup.GS1,
    audioSetup.GS2
  ];


  //can plug in same random number to find which note was chosen
  const decode = [
    'A', 'A', 'A#', 'A#', 'B', 'B', 'C', 'C', 'C#', 'C#', 'D', 'D', 'D#', 'D#', 'E', 'E', 'F', 'F', 'F#', 'F#', 'G', 'G', 'G#', 'G#'
  ];

  //gives random number, plays sound, & checks validity? 
  const start = () => {
    //give random number through 24
    let a = Math.random();
    let b = Math.round(a*23);
    console.log('random number was: ' + decode[b]);

    //play random sound
    audio[b].play()

    //send random number to check user answer
    check(b)
  };


  //sets to rand number
  function check(data) {
    return num = data;
  };


  //grabs answer and checks if wrong or right
  const handleFormSubmit = (e) => {
    console.log('num = ' + num)
    let correctAnswer = decode[num];
    let userAnswer = e.answer.toUpperCase();

    console.log(correctAnswer, userAnswer);

    if(correctAnswer === userAnswer) {
      //*dispatch backend call* data shoud look like:
      const data = {
        note: correctAnswer, correct: true
      };
      console.log('true')
      //*function that returns jsx indicating correct answer*
    } else {
      //*dispatch backend call* data shoud look like:
      const data = {
        note: correctAnswer, correct: false
      };
      //*function that returns jsx indicating incorrect answer*
    };
  };


  return (
    <div>
      <button onClick={start}>Play</button>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          Your Answer:
        </label>
        <br/>
        <input {...register('answer', {required: true})}></input>
        <br/>
        {errors.answer?.message}
        <button className="btn btn-outline-secondary mt-2 offset-md-2 mb-2" type="submit">Submit</button>
      </form>
    </div>
  )
};

//I want the backend user data to look like {note: C, 
//correct: true}
//this would allow easy looping through to create graphs and to 
//show which notes the user is struggling with the most

export default Test;