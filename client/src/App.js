import image from './img/2.jpg';
import Header from './components/headers/header-home';
import { useSelector } from 'react-redux';
import './css/general.css'

function App() {
    const authenticated = useSelector(state => state.auth.authenticated);

    if (authenticated) {
      return (
        <>
          <div style={{ backgroundImage: `url(${image})` }} className="image">
            <Header />
            <div className='home'>
              <div className='popup font'>
                <p className='font'>Click on perfect pitch to start a quiz. Click on progress to see your accounts stats!</p>
              </div>
            </div>
          </div>
        </>
      );
    };

  return (
    <>
      <div style={{ backgroundImage: `url(${image})` }} className="image">
        <Header />
        <div className='home'>
          <div style={{width: '500px', margin: 'auto', background: 'rgb(218, 218, 218)'}}>
            <p className='font '>Welcome to Tune Your Ear. This is a website built to help you achieve perfect pitch. The first step is to sign up or login! Both can be found on the header above!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
