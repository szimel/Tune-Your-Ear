import '../general.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {

  return(
    <>
      <div>
        <ul id="nav">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Log In</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </div>
    </>
  )
};

export default Header;