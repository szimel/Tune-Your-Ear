import React, { useEffect } from 'react';
import '../../index.css'
import Header from '../header';
import { refContainer, noteSetup } from '../keys';
import Forms from '../q&a';


//controls which notes are being played
export var chosenNotes = {};

const Easy = () => { 
  
  //notes for easy
  const refArray = {
    C: refContainer.C, E: refContainer.E, G: refContainer.G
  };


  //clicks notes in refArray
  useEffect(() => {
    const keys = Object.keys(refArray);
    keys.map(e => {
      refArray[e].current.click();
    });
  });


  //adds notes to above array 
  const setNotes = (e) => {
    let a = e.target.getAttribute('note').toString()

    //finds if adding or removing targeted note
    if (e.target.getAttribute('id') === '') {
      return delete chosenNotes[a];

    } else {
      noteSetup.find(e => {
        //match note to audio files and add it to note array
        if(Object.keys(e) == a) {
          let [key] = Object.entries(e);

          return chosenNotes[key[0]] = key[1];
        };
      });
    };
  };


  //highlights white key
  const setAttributeWhite = (e) => {
    if (e.target.id === '') {
      return e.target.setAttribute('id', 'white')
    } else {
      return e.target.setAttribute('id', '')
    };
  };


  //highlights black keys
  const setAttributeBlack = (e) => {
    if (e.target.id === '') {
      return e.target.setAttribute('id', 'black')
    } else {
      return e.target.setAttribute('id', '')
    };
  };



  const setAttribute = (e) => {
    if(e.target.getAttribute('value') === 'white') {
      setAttributeWhite(e);
      setNotes(e);
    } else {
      setAttributeBlack(e);
      setNotes(e);
    };
  };
  
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='padding'>
        <ul className="set " id="piano-ul">
          <li className="white c" value='white' note='C'
          ref={refContainer.C}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="black cs" value='black' note='CS'
          ref={refContainer.CS}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white d" value='white' note='D'
          onClick={(e) => setAttribute(e)} 
          ref={refContainer.D}
          ></li>
          <li className="black ds" value='black' note='DS'
          ref={refContainer.DS}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white e" value='white' note='E'
          ref={refContainer.E}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white f" value='white' note='F'
          ref={refContainer.F}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="black fs" value='black' note='FS'
          ref={refContainer.FS}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white g" value='white' note='G'
          ref={refContainer.G}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="black gs" value='black' note='GS'
          ref={refContainer.GS}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white a" value='white' note='A'
          ref={refContainer.A}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="black as" value='black' note='AS'
          ref={refContainer.AS}
          onClick={(e) => setAttribute(e)}
          ></li>
          <li className="white b" value='white' note='B'
          ref={refContainer.B}
          onClick={(e) => setAttribute(e)}
          ></li>
        </ul>
      </div>
      <Forms />
    </div>
  )
};


export default Easy;