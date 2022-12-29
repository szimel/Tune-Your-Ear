import { totalProgress } from "./format";
import '../../css/progress.css'
import ChartGraph from "./chart-all-q-graph";
import ChartByNoteGraph from "./chart-by-note-graph";


//store all data in correct formats
export var chordDataOverlord = {
  session: null,
  time: null,
  answers: null,
  answersBySession: {},
  answersByNote: {A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []},
  bestNote: null,
};

const ChordProgress = () => {
  while (totalProgress.perfectPitch === undefined) {//so whole thing doesn't freak out
    return null;
  };

  //turns the 0's into 1's
  let progress = totalProgress.chordQuiz; 
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
    return chordDataOverlord.answersBySession[e] = [];
  });

  //find notes with highest and lowest ratio
  const noteFinder = () => {
    const notes = Object.keys(chordDataOverlord.answersByNote);
    let standIn = chordDataOverlord.answersByNote

    //finds the biggest ratio
    let biggestNum = 0
    for (let i = 0; i < notes.length; i++) {
      let positive = standIn[notes[i]].filter(e => e.correct === 1)
      positive = positive.length / standIn[notes[i]].length;
      if(biggestNum < positive && positive != 0) {
        biggestNum = positive;
        chordDataOverlord.bestNote = notes[i];
      };
    };

    //find the smallest ratio
    let smallestNum = 0
    for (let i = 0; i < notes.length; i++) {
      let positive = standIn[notes[i]].filter(e => e.correct === -1);
      positive = positive.length / standIn[notes[i]].length;
      if(smallestNum < positive && positive != 0) {
        smallestNum = positive;
        chordDataOverlord.worstNote = notes[i];
      };
    };
  };

  //formats chordDataOverlord 
  const dataFormat = () => {
    let answerHolder = [];
    let sessionHolder = 0;
    progress.map(e => {
      sessionHolder = sessionHolder + e.session;//adds all sessions together
      return e.answers.map(p => {
        return chordDataOverlord.answersBySession[e.date].push(p), answerHolder.push(p),
        chordDataOverlord.answersByNote[p.chord].push(p);
      });
    });
    chordDataOverlord.answers = answerHolder;
    chordDataOverlord.session = sessionHolder;
    noteFinder();
    }
  dataFormat();

  //changes time into hours/mins/sec
  const time = () => {
    let sec = Math.round(chordDataOverlord.session/1000)
    if (sec > 60 && sec < 3600) {
      let mins = Math.floor(sec / 60);
      sec = sec - (mins * 60);
      return chordDataOverlord.time= `${mins}min, ${sec}s`;
    } else if (sec > 3600) {
      let hours = Math.floor(sec / 3600);
      sec = sec - (hours * 3600); //pulls out the hour from seconds
      let mins = Math.floor(sec / 60);
      sec = sec - (mins * 60);// same as above
      return chordDataOverlord.time = `${hours}hr, ${mins}min, ${sec}s!`
    };
    return chordDataOverlord.time = `${sec} seconds!`;
  };
  time();


  console.log(progress);
  return (
    <>
      <h2 className="mx-auto mt-3" style={{width: '40vw'}}>
        Chord Progress
      </h2>
      <div className="Stats">
        <ul>
          <li>
            Total Time
            <p>{chordDataOverlord.time}</p>
          </li>
          <li>
            Total Questions
            <p>{chordDataOverlord.answers.length}</p>
          </li>
          <li>
            Best Note
            <p>{chordDataOverlord.bestNote}</p>
          </li>
          <li>
            Worst Note
            <p>{chordDataOverlord.worstNote}</p>
          </li>
        </ul>
      </div>
      <ChartGraph /> 
      <ChartByNoteGraph />
    </>
  );
};

export default ChordProgress;