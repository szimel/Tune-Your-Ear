import '../../css/general.css';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../actions';


const HeaderHome = () => {
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
        <ul id="nav-home">
          <li data-intro="Click here to return to the main menu."><a href="/"><HomeIcon /></a></li>
          <li data-intro="This will take you to the perfect pitch quiz"><a href='perfect-pitch'>Perfect Pitch</a></li>
          <li data-intro="This will take you to see your overall progress! If this is your first time, try taking a quiz first!"><a href='/progress'>Progress</a></li>
          <li data-intro="Click here to log out!" id='auth-nav' onClick={handleSignOutClick}><a href="/"><LogoutIcon /></a></li>
        </ul>
      </div>
    )
  }

  return(
    <div>
      <ul id="nav-home">
        <li data-intro="Click here to return to the main menu"><a href="/"><HomeIcon /></a></li>
        <li data-intro="Click here to log in (if you have already made an account)! "><a href="/login">Log In</a></li>
        <li data-intro="Click here to create an account!"><a href='/signup'>Sign Up</a></li>
      </ul>
    </div>
  )
};

export default HeaderHome;