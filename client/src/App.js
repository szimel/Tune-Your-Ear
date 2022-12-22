import image from './img/2.jpg';
import Header from './components/headers/header-home';
import { useSelector } from 'react-redux';
import './css/general.css'

function App() {
    const authenticated = useSelector(state => state.auth.authenticated);

    if (authenticated) {
      return (
        <>
          <Header />
          <div style={{ backgroundImage: `url(${image})` }} className="image">
            <Header />
          </div>
        </>
      );
    };

  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${image})` }} className="image">
        <Header />
        <div className='home'>
          <div style={{width: '500px', margin: 'auto', background: 'rgb(218, 218, 218)', height: '300px'}}>
            <p className='font m-3'>*HOW TO INSTRUCTIONS*</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
