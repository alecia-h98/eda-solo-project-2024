import useStore from '../../zustand/store'
import { useNavigate } from 'react-router-dom';
import heart from '/images/like.png';
import basket from '/images/wicker-basket.png';
import magnifying from '/images/search.png';
import lightBulb from '/images/light-bulb.png';
import './HomePage.css';
import Button from 'react-bootstrap/Button';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();


  const moveFavorites = (event) => {
    navigate(`/favorites`)
  };

  const moveFoundItems = (event) => {
    navigate(`/found`)
  };

  const moveForagable = (event) => {
    navigate(`/items`)
  };

  const moveTaG = (event) => {
    navigate(`/tips_guidelines`)
  };

  return (
    <>
    <section id="background" >
      <h3><b>Welcome Back {user.name}!</b></h3>
      <br />
      <section  >
      <div className='favorites' onClick={moveFavorites} >
      <img id="heart" src={heart}/>
      <h5>Favorites</h5>
      </div>
      <br />
      <div className='foundItems' onClick={moveFoundItems} >
      <img id="basket" src={basket} />
      <h5>Found Items</h5>
      </div>
      <br />
      <div className='foragable' onClick={moveForagable} >
      <img id="magnify" src={magnifying} />
      <h5>Foragable Items</h5>
      </div>
      <br />
      {/* <div className='findASnack' >
      <img />
      <h5>Find-a-snack</h5>
      </div>
      <br /> */}
      <div className='T_a_G' onClick={moveTaG} >
      <img id="lightbulb" src={lightBulb} />
      <h5>Tips & Guidelines</h5>
      </div>
      </section>
      {/* <p>Your username is: {user .username}</p>
      <p>Your ID is: {user.id}</p> */}
      <Button id='button' variant="dark" onClick={logOut}>
        Log Out
      </Button>
      </section>
    </>
  );
}


export default HomePage;
