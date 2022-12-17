import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../actions";
import Header from "../headers/header-reg"
import '../../header-reg.css'

var holder = {
  A: [], AS: [], B: [], C: [], CS: [], D: [], DS: [], E: [], F: [], FS: [], G: [], GS: []
};
var data = {};

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

  const jsx = []
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
          <td>{data[newKeys[i]].at(-1)}</td>
        </tr>
      )
    };
    return jsx;
  }

  function test() {
    console.log(data)
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Note</th>
              <th scope="col">Times Seen</th>
              <th scope="col">Percentage Correct</th>
            </tr>
          </thead>
          <tbody>
            {formatData()}
          </tbody>
        </table>
        </div>
      </div>
      {/* <div onClick={test}>aasdfadf</div> */}
    </div>
  );
};

export default Session;