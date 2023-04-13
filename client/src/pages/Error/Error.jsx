import { Link } from "react-router-dom"
import './Error.css'

export default function Error() {
  return (
    <div className="div_containerError">
        <h1>Page Not Found</h1>
        <Link className="error_backhome" to='/home'><u>Back to Home</u></Link>
    </div>
  )
}
