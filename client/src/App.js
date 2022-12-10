import './general.css';
import { Link } from "react-router-dom";
import image from './img/2.jpg';
import Header from './components/header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './actions';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentUser());
    }, []);

  const user = useSelector(state => state.user);

  console.log(user);


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
