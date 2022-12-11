import Dropdown from 'react-bootstrap/Dropdown';
import Header from './header';
const style = {
  width: '400px'
}

const Test = () => {
  const handler = 'http://localhost:3000/perfect-pitch'
  return (
    <div>
      <Header />
      <div className="mx-auto" style={style}>
        <h2 className='font'>Perfect Pitch Training</h2>
        <p className='mt-3'>Please select from the following items, listed below. They are ranked from easier (top) to hardest (bottom).</p>
        <div className='row'>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='http://localhost:3000/perfect-pitch:easy'>C, D, E, F, G</Dropdown.Item>
              <Dropdown.Item href="http://localhost:3000/perfect-pitch:intermediate">C Scale - C, D, E, F, G, A, B, C</Dropdown.Item>
              <Dropdown.Item href="http://localhost:3000/perfect-pitch:chromatic">All Notes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
};

export default Test;