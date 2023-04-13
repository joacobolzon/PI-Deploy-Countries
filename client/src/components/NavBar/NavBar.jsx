import { Link } from "react-router-dom";
import mundo from '../../images/logo_mundo.gif'
import './NavBar.css'

export default function NavBar() {
  return (
    <div className="div_containerNav">
      <div className="div_containerInfo">
        <div>
          <Link to='/home'>
            <img src={mundo} alt="Logo Countries" /> 
          </Link>
        </div>
        <div className="div_options">
          <Link to='/home'>Home</Link>
          <Link to='/activities'>Activities</Link>
        </div>
      </div>
    </div>
  )
}