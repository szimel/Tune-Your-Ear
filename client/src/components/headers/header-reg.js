import '../../css/header-reg.css';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../actions';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //grab auth state
  const authenticated = useSelector(state => state.auth.authenticated);


  //sign out axios call
  const handleSignOutClick = () => {
    dispatch(signout(() => {
      navigate("home", { replace: true });
    }));
  };

  //change navbar in user is logged in
  if (authenticated) {
    return (
      <div>
        <ul id="nav-reg">
          <li><a href="/"><HomeIcon /></a></li>
          <li><a href='/perfect-pitch'>Perfect Pitch</a></li>
          <li><a href='/chords'>Chord Quiz</a></li>
          <li><a href='/progress'>Progress</a></li>
          <li id='auth-nav' onClick={handleSignOutClick}><a href="/"><LogoutIcon /></a></li>
        </ul>
      </div>
    )
  }

  return(
    <div>
      <ul id="nav-reg">
        <li><a href="/"><HomeIcon /></a></li>
        <li><a href="/login">Log In</a></li>
        <li><a href='/signup'>Sign Up</a></li>
      </ul>
    </div>
  )
};

export default Header;