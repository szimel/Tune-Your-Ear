import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quizMode } from '../../actions';
import Header from '../headers/header-reg';


// need to make action call to add easy medium or hard to store 

const Test = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SetChosenMode = (e) => {
    dispatch(quizMode(e, () => {
      navigate("/perfect-pitch/quiz", { replace: true });
    }));
  };

  //if user isn't logged in, send to home screen
  const authenticated = useSelector(state => state.auth.authenticated);
  const notSignedIn = () => {
    navigate("/", { replace: true })
  }
  console.log(authenticated);
  if(!authenticated) {
    notSignedIn()
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mx-auto" style={{width: '400px'}}>
        <p className='white'>this is such a hacky fix and if you find this I truly apologize</p>
        <br/>
        <h2 className='font'>Perfect Pitch Training</h2>
        <p className='mt-3'>Please select from the following items, listed below. They are ranked from easier (top) to hardest (bottom).</p>
        <div className='row'>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select a quiz
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item  onClick={() => SetChosenMode('easy')}>C, E, G</Dropdown.Item>
              <Dropdown.Item  onClick={() => SetChosenMode('medium')}>C Scale - C, D, E, F, G, A, B, C</Dropdown.Item>
              <Dropdown.Item  onClick={() => SetChosenMode('hard')}>All Notes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
};

export default Test;