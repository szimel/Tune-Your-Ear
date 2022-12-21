import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../actions";
import Header from "./headers/header-reg";


//store all data in correct formats
var dataOverlord = {
  session: null,
  answers: null,
  answersByNote: {A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []}
};


const Progress = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  const progress = useSelector(state => state.user.perfectPitch);
  while(progress === undefined) {
    return null;
  };

  //formats dataOverlord 
  const answers = () => {
    let answerHolder = [];
    let sessionHolder = 0;
    progress.map(e => {
      sessionHolder = sessionHolder + e.session;//adds all sessions together
      e.answers.map(p => {
        //turns 0's into 1's for graphing part
        if(p.correct === 0) {
          p.correct = -1
        };
        answerHolder.push(p);
        dataOverlord.answersByNote[p.note].push(p);
      })
    });
    dataOverlord.answers = answerHolder;
    dataOverlord.session = sessionHolder;
  }
  answers();
  

  //grabs answers by note
  const answersByNote = () => {
    progress.map(e => {
      e.answers.map(p => {

      })
    })
  }
  console.log(dataOverlord);
  return (
    <div>
      <Header />
      <div className="mx-auto" style={{width: '500px'}}>
        advertising doesn't work? JUST DID LMAO fat fat fat fat fat fat fat fat fat fat fat 
        
      </div>
    </div>
  );
};

export default Progress;