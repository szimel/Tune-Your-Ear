import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../actions";
import { totalProgress } from "./format";
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


const NoteProgress = () => {
  while (totalProgress.perfectPitch === undefined) {//so whole thing doesn't freak out
    return null;
  };


  //turns the 0's into 1's
  let progress = totalProgress.perfectPitch; 
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


  return (
    <>
      <h2 className="mx-auto mt-3" style={{width: '40vw'}}>
        Perfect Pitch Progress
      </h2>
      <div className="Stats">
        <ul>
          <li>
            Total Time
            <p>{dataOverlord.time}</p>
          </li>
          <li>
            Total Questions
            <p>{dataOverlord.answers.length}</p>
          </li>
          <li>
            Best Note
            <p>{dataOverlord.bestNote}</p>
          </li>
          <li>
            Worst Note
            <p>{dataOverlord.worstNote}</p>
          </li>
        </ul>
      </div>
      <Graph /> 
      <ByNoteGraph />
    </>
  );
};

export default NoteProgress;