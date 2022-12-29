import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../css/index.css'
import Header from '../headers/header-reg';
import { refContainer, chordAudioSetup } from '../keys';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import introJs from 'intro.js';
import Answer from './q&a';


//controls which notes are being played
export var chosenNotes = {};
var refArray = {}


const Piano = () => { 

  // //clicks notes in refArray
  // useEffect(() => {
  //   const keys = Object.keys(refArray);
  //   keys.map(e => {
  //     refArray[e].current.click();
  //   });
  // });


  //adds notes to above array 
  const setNotes = (e) => {
    //for when <p> element on piano UI is clicked
    if (e.target.nodeName === 'P') {
      //ex: <li className='black ds' value='black' note='D#'></li>
      const a = e.target.offsetParent.getAttribute('note').toString(); //grabs note value
      const parent = e.target.offsetParent;
      if (parent.getAttribute('id') === '') {
        return delete chosenNotes[a];
      } else {
        debugger
        return chosenNotes[a] = chordAudioSetup[a]
      };
    };

    //finds if adding or removing targeted note
    const b = e.target.getAttribute('note').toString();
    if (e.target.getAttribute('id') === '') {
      return delete chosenNotes[b];

    } else {
      return chosenNotes[b] = chordAudioSetup[b]
    };
  };  



  //highlights white key
  const setAttributeWhite = (e) => {
    if (e.target.getAttribute('note') === null) {
      const parent = e.target.offsetParent
      if (parent.id === '') {
        console.log('"')
        return parent.setAttribute('id', 'white')
      } else {
        return parent.setAttribute('id', '')
      };
    } else if (e.target.id === '') {
      return e.target.setAttribute('id', 'white')
    } else {
      return e.target.setAttribute('id', '')
    };
  };


  //highlights black keys
  const setAttributeBlack = (e) => {
    if (e.target.getAttribute('note') === null) {
      const parent = e.target.offsetParent
      if (parent.id === '') {
        console.log('"')
        return parent.setAttribute('id', 'black')
      } else {
        return parent.setAttribute('id', '')
      };
    } else if (e.target.id === '') {
      return e.target.setAttribute('id', 'black')
    } else {
      return e.target.setAttribute('id', '')
    };
  };



  const setAttribute = (e) => {
    if(e.target.getAttribute('value') === 'white' || e.target.className === 'hints-white') {
      setAttributeWhite(e);
      setNotes(e);
    } else {
      setAttributeBlack(e);
      setNotes(e);
    };
  };

  //runs tour guide thing
  const run = () => {
    introJs ().start();
  }
  
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='Padding'>
        <ul data-intro="Shows and controls which chords appear on the quiz"className="set " id="piano-ul">
          <HelpCenterRoundedIcon
             sx={{ 
              color: "white", 
              borderRadius: "50%",
             }}
             onClick={run}
           />
          <li className="white c" value='white' note='C'
          ref={refContainer.C}
          onClick={(e) => setAttribute(e)}
          >
            <p>C</p>
          </li>
          <li className="black cs" data-intro="Click on a chord, like this one, to add it to the quiz. If it is highlighted, then it is in the quiz." value='black' note='C#'
          ref={refContainer.CS}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-black'>C#</p>
          </li>
          <li className="white d" value='white' note='D'
          onClick={(e) => setAttribute(e)} 
          ref={refContainer.D}
          >
            <p>D</p>
          </li>
          <li className="black ds" value='black' note='D#'
          ref={refContainer.DS}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-black'>D#</p>
          </li>
          <li className="white e" value='white' note='E'
          ref={refContainer.E}
          onClick={(e) => setAttribute(e)}
          >
            <p>E</p>
          </li>
          <li className="white f" value='white' note='F'
          ref={refContainer.F}
          onClick={(e) => setAttribute(e)}
          >
            <p>F</p>
          </li>
          <li className="black fs" value='black' note='F#'
          ref={refContainer.FS}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-black'>F#</p>
          </li>
          <li className="white g" value='white' note='G'
          ref={refContainer.G}
          onClick={(e) => setAttribute(e)}
          >
            <p>G</p>
          </li>
          <li className="black gs" value='black' note='G#'
          ref={refContainer.GS}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-black'>G#</p>
          </li>
          <li className="white a" value='white' note='A'
          ref={refContainer.A}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-white'>A</p>
          </li>
          <li className="black as" value='black' note='A#'
          ref={refContainer.AS}
          onClick={(e) => setAttribute(e)}
          >
            <p className='hints-black'>A#</p>
          </li>
          <li className="white b" value='white' note='B'
          ref={refContainer.B}
          onClick={(e) => setAttribute(e)}
          >
            <p>B</p>
          </li>
        </ul>
      </div>
      <Answer />
    </div>
  )
};


export default Piano;