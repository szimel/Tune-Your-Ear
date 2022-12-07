import './App.css';
import { Link } from "react-router-dom";

function App() {



  return (
    <div>
      <Link to='/signup'>
        Sign Up
      </Link>
      <br />
      <Link to='login'>
        Log In
      </Link>
    </div>
  );
}

export default App;
