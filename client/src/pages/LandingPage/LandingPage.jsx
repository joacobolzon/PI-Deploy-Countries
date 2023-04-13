import { Link } from 'react-router-dom';
import './LandingPage.css'

export const LandingPage = () => {
  return (
    <div className='div_container'>
      <div className='div_containerDescription'>
        <h1>This is a project about Countries from Soy Henry!</h1>
        <h2>Made by <a href='https://www.linkedin.com/in/joaquin-bolzon-b83a9a24a/' target='_blank' rel="noopener noreferrer">Enzo Joaquin Bolzon</a></h2>
        <Link to='/home'>
          <button className='btn_home'>Start</button>
        </Link>
      </div>
      <div className='div_containerImg'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rotating_earth_%28huge%29.gif/600px-Rotating_earth_%28huge%29.gif" alt="img_landing" />
      </div>
    </div>
  )
}