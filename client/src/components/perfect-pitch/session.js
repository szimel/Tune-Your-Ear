import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../actions";
import Header from "../headers/header-reg"
import '../../header-reg.css'

var holder = {
  A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []
};
var data = {};
var time = {};

const Session = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  let progress = useSelector(state => state.user.perfectPitch);

  //so it doesn't have a hissy fit trying to load before state 
  while (progress === undefined) {
    return null;
  };

  progress = progress.at(-1);
  if (progress === undefined || progress.length === 0) {
    return (
      <div className="color">
        <Header />
        <div className="placeholder"></div>
        <div className="styled">
          <p>Whoops, looks like you got here without completing a quiz. No worries, click <a href='http://localhost:3000/perfect-pitch'>here</a> to start a quiz!</p>
        </div>
      </div>
    )
  }
  //calculates time spent in previous session
  const Time = (e) => {
    let sec = Math.round(e/1000)
    if (sec > 60) {
      let mins = Math.floor(sec / 60);
      sec = sec - (mins * 60);
      return time.session = `${mins} minutes, ${sec} seconds!`;
    }
    return time.session = `${sec} seconds!`;
  };
  Time(progress.session)
  console.log(time);
  const jsx = [];
  const formatData = () => {
    //calculate time
    const time = progress.time / 1000;
    //determines how many times each note was played
    progress.answers.map(e => {
      return holder[e.note].push(e);
    });
    //grabs holder notes with data inside
    const keys = Object.keys(holder);
    keys.map(p => {
      if(holder[p].length !== 0) {
        return data[p] = holder[p]
      }
    });
    const newKeys = Object.keys(data);
    //calculate percent correct and adds to end of data array
    for (let i = 0; i < newKeys.length; i++) {
      let number = 0
      data[newKeys[i]].map(e => {
        number += e.correct
      });
      number = (number / data[newKeys[i]].length) * 100
      data[newKeys[i]].push(number)
    };
    for (let i = 0; i < (newKeys.length); i++) {
      jsx.push(
        <tr key={i}>
          <th scope="row">{newKeys[i]}</th>
          <td>{data[newKeys[i]].length -1}</td>
          <td>{data[newKeys[i]].at(-1)}%</td>
        </tr>
      )
    };
    return jsx;
  }

  return (
    <div className="color">
      <Header />
      <div className="placeholder"></div>
      <div className="styled">
        <h1 className="mx-auto font p-1" style={{width: '183px'}}>Finished!</h1>
        <div>
        </div>
        <div>
          <p>This session lasted {time.session}</p>
        </div>
        <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Note</th>
              <th scope="col">Times Heard</th>
              <th scope="col">Percentage Correct</th>
            </tr>
          </thead>
          <tbody>
            {formatData()}
          </tbody>
        </table>
        <p>Great Work! Taking this quiz for a couple minutes a day is a great way to tune your ears to perfection! Click <a href="https://en.wikipedia.org/wiki/Absolute_pitch" target="_blank">here</a> to learn more about perfect pitch!</p>
        </div>
      </div>
    </div>
  );
};

export default Session;