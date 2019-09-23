import React from 'react';
import { Link } from 'react-router-dom';
import AppPhoto from '../../images/logo192.png';
import classes from './Home.module.css';

const Home = () => {
  return (
    <>
      <center>
        <div className={classes.marginHome}>
          <h1>Organize yourself for life!</h1>
          <p className={classes.text180}>Aeon Planner helps you get things done.</p>
          <div className={classes.marginBtn}>
            <Link to="/board">
              <button className={`btn ${classes.greenBtn}`}>Get Started - It's Free!</button>
            </Link>
          </div>
          <img src={AppPhoto} alt="app" width="100" />
          <p className={classes.marginBetween}>Don't forget to add Aeon Planner to your home screen!</p>
        </div>

        <footer>
          © {new Date().getFullYear()}
            {` `}
          <a href="https://brenobaptista.github.io" className={classes.greenLink}>Breno Baptista</a>.
        </footer>
      </center>
    </>
  )
}

export default Home;