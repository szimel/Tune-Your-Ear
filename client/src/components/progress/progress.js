import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../actions";
import Header from "../headers/header-reg";
import Graph from "./all-q-graph";
import '../../css/progress.css'
import ByNoteGraph from "./by-note-graph";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//store all data in correct formats
export var dataOverlord = {
  session: null,
  time: null,
  answers: null,
  answersBySession: {},
  answersByNote: {A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []},
  bestNote: null,
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


  //turns the 0's into 1's
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

  //find notes with highest and lowest ratio
  const noteFinder = () => {
    const notes = Object.keys(dataOverlord.answersByNote);
    let standIn = dataOverlord.answersByNote

    //finds the biggest ratio
    let biggestNum = 0
    for (let i = 0; i < notes.length; i++) {
      let positive = standIn[notes[i]].filter(e => e.correct === 1)
      positive = positive.length / standIn[notes[i]].length;
      if(biggestNum < positive && positive != 0) {
        biggestNum = positive;
        dataOverlord.bestNote = notes[i];
      };
    };

    //find the smallest ratio
    let smallestNum = 0
    for (let i = 0; i < notes.length; i++) {
      let positive = standIn[notes[i]].filter(e => e.correct === -1);
      positive = positive.length / standIn[notes[i]].length;
      if(smallestNum < positive && positive != 0) {
        smallestNum = positive;
        dataOverlord.worstNote = notes[i];
      };
    };
  };

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
    noteFinder();
    }
  dataFormat();

  //changes time into hours/mins/sec
  const time = () => {
    let sec = Math.round(dataOverlord.session/1000)
    if (sec > 60 && sec < 3600) {
      let mins = Math.floor(sec / 60);
      sec = sec - (mins * 60);
      return dataOverlord.time= `${mins}min, ${sec}s`;
    } else if (sec > 3600) {
      let hours = Math.floor(sec / 3600);
      sec = sec - (hours * 3600); //pulls out the hour from seconds
      let mins = Math.floor(sec / 60);
      sec = sec - (mins * 60);// same as above
      return dataOverlord.time = `${hours}hr, ${mins}min, ${sec}s!`
    };
    return dataOverlord.time = `${sec} seconds!`;
  };
  time();
  console.log(dataOverlord);


  return (
    <div>
      <Header />
      <div className="Color">
        <div className="mx-auto" style={{width: '200px'}}>
          <h1>Progress</h1>
        </div>
        <div className="stats">
          <div className='box space'>
            <h6 className="p-2">Total Time</h6>
            <h4 className=""><b>{dataOverlord.time}</b></h4>
          </div>
          <div className='box space'>
            <h6 className="p-2">Total Questions</h6>
            <h4><b>{dataOverlord.answers.length}</b></h4>
          </div>
          <div className='box space'>
            <div>
            <h6 className="p-2">Best Note</h6>
            {/* <InfoOutlinedIcon /> */}
            </div>
            <h4><b>{dataOverlord.bestNote}</b></h4>
          </div>
          <div className='box'>
            <h6 className="p-2">Worst Note</h6>
            <h4><b>{dataOverlord.worstNote}</b></h4>
          </div>
        </div>
      </div>
      <div className="graph">
        <Graph />
      </div>
      <div className="Color">
        <div className="graph">
          <ByNoteGraph />
        </div>
      </div>
    </div>
  );
};

export default Progress;