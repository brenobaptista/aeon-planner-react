import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppPhoto from '../../images/logo192.png';
import classes from './Home.module.css';


const Home = () => (
  <div>
    <div className={classes.marginHome}>
      <h1 className="centerText">Organize yourself for life!</h1>
      <p className={`centerText ${classes.text180} ${classes.grayColor}`}>Aeon Planner helps you get things done.</p>
      <div className={`centerText ${classes.marginBtn}`}>
        <Link to="/login">
          <Button className={classes.greenBtn}>Get Started - It&lsquo;s Free!</Button>
        </Link>
      </div>
      <center>
        <img src={AppPhoto} alt="app" width="100" />
      </center>
      <p className={`centerText ${classes.marginBetween} ${classes.grayColor}`}>
        Don&lsquo;t forget to add Aeon Planner to your home screen!
      </p>
    </div>

    <h1 className={`centerText ${classes.marginHome}`}>About this project</h1>
    <div className={classes.grayColor}>
      <div className="container">
        <div className="row">
          <div className={`col-sm-6 ${classes.betterText}`}>
            <p>
              Aeon Planner is my personal planner PWA made using React.
              I made it for educational purposes and for my own use.
              It&lsquo;s like Trello + Evernote, or like that post-it mural
              you&lsquo;ve got in your bedroom.
            </p>
            <p>
              It&lsquo;s meant to be simple and straight-forward, and I&lsquo;ve
              put some of my own philosophies about productivity.
              It&lsquo;s not meant to be a Trello or Pipefy clone (but it was
              true in the very beginning).
            </p>
          </div>
          <div className="col-sm-6">
            <p>
              Some differences from Trello:
            </p>
            <ul>
              <li>
                No &ldquo;to do&ldquo;, &ldquo;doing&ldquo; and &ldquo;done&ldquo; lists
                right from the start.
              </li>
              <li>No vertical lists.</li>
              <li>Position is more important than colors (top to bottom tasks).</li>
              <li>Information (task description, for example) easily visible.</li>
              <li>No teams, obviously.</li>
              <li>Less bloat.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer className={`centerText ${classes.grayColor}`}>
      ©
      {new Date().getFullYear()}
      {' '}
      <a href="https://brenobaptista.github.io" className={classes.greenLink}>Breno Baptista</a>
    </footer>
  </div>
);

export default Home;
