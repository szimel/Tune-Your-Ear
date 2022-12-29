import '../../css/progress.css'
import Header from '../headers/header-reg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../actions';
import NoteProgress from './note-progress';
import ChordProgress from './chord-progress';

export var totalProgress;

const Progress = () => {
  const ref = React.createRef();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
    // ref.current.click();
  }, []);

  const holder = useSelector(state => state.user)
  totalProgress = holder;
  

  const [pitch, setPitch] = useState(true);
  const [chord, setChord] = useState(false);

  //swithc between pitch and chord content
  const setPerfectPitch = (e) => {
    setPitch(true);
    setChord(false);
    //turns off the other one
    const pitch = document.getElementsByName('chord')
    pitch[0].setAttribute('id', '');
    //if svg is clicked
    if(e.target.localName !== 'div') {
      console.log('got here');
      e = e.target.parentElement
      return e.setAttribute('id', 'highlighted');
    }else  {
      return e.target.setAttribute('id', 'highlighted');
    };
  };

  const setChords = (e) => {
    setPitch(false);
    setChord(true);
    const pitch = document.getElementsByClassName('pitch')
    pitch[0].setAttribute('id', '');
    if(e.target.localName !== 'div') {
      console.log('got here');
      e = e.target.parentElement
      return e.setAttribute('id', 'highlighted');
    }else {
      return e.target.setAttribute('id', 'highlighted');
    };
  };



  const display = () => {
    if (pitch) {
      return (
        <NoteProgress />
      );
    } else if (chord) {
      return (
        <ChordProgress />
      )
    }
  }

  return (
    <div className='Container'>
      <Header />
      <div>
        <div className='padding'>
          <div className='horizontal'>
            <div onClick={setPerfectPitch} ref={ref}className='pitch'>
                Perfect Pitch
                <ArrowForwardIosIcon />
            </div>
            <div onClick={setChords} name='chord'>
                Chord Recognition
                <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
        <div className='content'>{display()}</div>
      </div>
    </div>
  )
}

export default Progress;