import image from './img/2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import './css/general.css'
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { signout } from './actions';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);

  //sign out axios call
  const handleSignOutClick = () => {
    dispatch(signout(() => {
      navigate("home", { replace: true });
    }));
  };

  const run = () => {
    introJs().setOptions({
      showProgress: true,
    }).start();
  }

  if (authenticated) {
    return (
      <>
        <div style={{ backgroundImage: `url(${image})` }} className="image">
          <div>
            <ul id="nav-home">
              <li data-intro="Click here to return to the main menu."><a href="/"><HomeIcon /></a></li>
              <li data-intro="This will take you to the perfect pitch quiz - a note recognition quiz"><a href='perfect-pitch'>Perfect Pitch</a></li>
              <li data-intro="This will take you to the chord quiz - a chord recognition quiz"><a href='chords'>Chord Recognition</a></li>
              <li data-intro="This will take you to see your overall progress! If this is your first time, try taking a quiz first!"><a href='/progress'>Progress</a></li>
              <li data-intro="Click here to log out!" id='auth-nav' onClick={handleSignOutClick}><a href="/"><LogoutIcon /></a></li>
            </ul>
          </div>
          <div className='home'>
            <div className='popup font' >
              <p className='font'><em><u><a onClick={run}>Click Here</a></u></em> to see a quick guided tour. Happy training!</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${image})` }} className="image">
      <div>
        <ul id="nav-home">
          <li data-intro="Click here to return to the main menu"><a href="/"><HomeIcon /></a></li>
          <li data-intro="Click here to log in (if you have already made an account)! "><a href="/login">Log In</a></li>
          <li data-intro="Click here to create an account!"><a href='/signup'>Sign Up</a></li>
        </ul>
      </div>
        <div className='home'>
          <div style={{width: '500px', margin: 'auto', background: 'rgb(218, 218, 218)'}}>
            <p className='font '>Welcome to Tune Your Ear. This is a website built to help you achieve perfect pitch. <em><u><a onClick={run}>Click Here</a></u></em> to see a guided tour.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
