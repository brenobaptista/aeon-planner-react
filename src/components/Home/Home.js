import React from 'react';
import { Link } from 'react-router-dom';
import AppPhoto from '../../images/logo192.png';

const Home = () => {
  return (
    <>
      <center>
        <h1 className="margin-home3">Organize your life with Aeon!</h1>
        <p className="bigger-text">Aeon Planner lets you get things done.</p>
        <div className="margin-home">
          <Link to="/board">
            <button className="btn button-color">Get Started - It's Free!</button>
          </Link>
        </div>
        <div className="margin-home2">
          <img src={AppPhoto} alt="app" width="100" />
          <h6 className="margin-between">Don't forget to add Aeon Planner to your home screen!</h6>
        </div>
        <footer>
          © {new Date().getFullYear()}
            {` `}
          <a href="https://brenobaptista.github.io" className="link-color">Breno Baptista</a>.
        </footer>
      </center>
    </>
  )
}

export default Home;