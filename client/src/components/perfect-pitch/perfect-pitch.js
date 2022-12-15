import Dropdown from 'react-bootstrap/Dropdown';
import Header from '../headers/header-reg';


const Test = () => {
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
              Dropdown Button
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='http://localhost:3000/perfect-pitch/easy'>C, E, G</Dropdown.Item>
              <Dropdown.Item href="http://localhost:3000/perfect-pitch/medium">C Scale - C, D, E, F, G, A, B, C</Dropdown.Item>
              <Dropdown.Item href="http://localhost:3000/perfect-pitch/hard">All Notes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
};

export default Test;