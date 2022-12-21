import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../actions";
import Header from "../headers/header-reg";
import Graph from "./graph";
import '../../css/progress.css'

//store all data in correct formats
export var dataOverlord = {
  session: null,
  answers: null,
  answersBySession: {},
  answersByNote: {A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []}
};


const Progress = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  let Progress = useSelector(state => state.user);
  while(Progress.perfectPitch === undefined) {//so whole thing doesn't freak out
    return null;
  };

  let progress = Progress.perfectPitch; 
  progress.map(e => {
    e.answers.map(p => {
      if (p.correct === 0) {
        p.correct = -1;
      };
    });
  });


  //adds dates to answersbysession object
  let holder = [];
  progress.map(e => {
    return holder.push(e.date);
  });
  holder.map(e => {
    return dataOverlord.answersBySession[e] = [];
  });

  //formats dataOverlord 
  const dataFormat = () => {
    let answerHolder = [];
    let sessionHolder = 0;
    progress.map(e => {
      sessionHolder = sessionHolder + e.session;//adds all sessions together

      return e.answers.map(p => {
        return dataOverlord.answersBySession[e.date].push(p), answerHolder.push(p),
        dataOverlord.answersByNote[p.note].push(p);
      });
    });
    dataOverlord.answers = answerHolder;
    dataOverlord.session = sessionHolder;
    }
  dataFormat();
  console.log(dataOverlord);


  return (
    <div>
      <Header />
      <div className="mx-auto" style={{width: '200px'}}>
        <h1>Progress</h1>
      </div>
      <div className="stats">
        <div className='box space'>
          <h6 className="p-2"><b>Total Time</b></h6>
        </div>
        <div className='box space'>
          <h6 className="p-2"><b>Total Questions</b></h6>
          <h4><b>{dataOverlord.answers.length}</b></h4>
        </div>
        <div className='box'>
          <h6 className="p-2"><b>Best Letter</b></h6>
          <h4>C</h4>
        </div>
      </div>
      <div className="graph">
        <Graph />
      </div>
    </div>
  );
};

export default Progress;