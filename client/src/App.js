import './general.css';
import { Link } from "react-router-dom";
import image from './img/2.jpg';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${image})` }} className="image">
        <Header />
      </div>
    </>
  );
}

export default App;
