import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userAnswer } from "../actions";
import { audio, decode } from "./keys";

const answerSchema = Yup.object().shape({
  answer: Yup.string().max(2, 'Invalid answer!').required()
});


//using var outside Test allows global variables 
var num;
var answer;
var toggle;

const Test = () => {
  //yup setup for grabbing user answers
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(answerSchema)
  });


  const dispatch = useDispatch();
  // const navigate = useNavigate();


  //gives random number, plays sound
  const start = () => {

    let a = Math.random();
    let b = Math.round(a*23);
    console.log('correct answer is: ' + decode[b]);

    audio[b].play();

    //send random number to check user answer
    check(b);

    //turns on replay
    return toggle = false;
  };


  //sets to rand number
  function check(data) {
    return num = data;
  };


  //grabs answer and checks if wrong or right
  const handleFormSubmit = (e) => {
    let correctAnswer = decode[num];
    let formAnswer = e.answer.toUpperCase();

    if(correctAnswer === formAnswer) {
      //*dispatch backend call* data shoud look like:
      const data = {
        note: correctAnswer, correct: true
      };

      setAnswer(data.correct);


      dispatch(userAnswer(data));
    } else {
      //*dispatch backend call* data shoud look like:
      const data = {
        note: correctAnswer, correct: false
      };

      setAnswer(data.correct);

      dispatch(userAnswer(data));
    };
  };

  //sets answer - only way i could get jsx to work correctly 
  //for result function - had to use global variable
  const setAnswer = (e) => {
    return answer = e;
  };


  //jsx to update UI on user answer
  const result = (e) => {
    if(e === true) {
      return <div>Your answer is correct!</div>;
    } else if (e === false) {
        return <div>Your answer is incorrect!</div>
    } else {
      return null;
    };  
  };


  //replay note
  const replay = () => {
    audio[num].play();
  };
  

  //single function to call two functions
  const onClick = () => {
    start();
    Toggle(false);
  };


  const Toggle = (e) => {
    return toggle = e;
  };


  //allows one notes per user answer
  const buttons =(e) => {
    if(e === true) {
      return <button onClick={onClick}>Play</button>
    } else if (e === false) {
      return <button onClick={replay}>Repeat</button>
    } else {
      return <button onClick={onClick}>Play</button>
    };
  };


  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {buttons(toggle)}
        <label>
          Your Answer:
        </label>
        <br/>
        <input {...register('answer', {required: true})}></input>
        <br/>
        {errors.answer?.message}
        <button className="btn btn-outline-secondary mt-2 offset-md-2 mb-2" type="submit">Submit</button>
        <div>
          {result(answer)}
        </div>
      </form>
    </div>
  )
};

export default Test;