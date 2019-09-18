import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <center>
        <h1 className="margin-home3">Organize your life with Aeon!</h1>
        <h2 className="margin-home">Aeon Planner lets you get things done.</h2>
        <Link to="/board">
          <button className="btn button-color">Get Started - It's free!</button>
        </Link>
        <p className="margin-home margin-home2">Aeon Planner is a project made using React.</p>
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