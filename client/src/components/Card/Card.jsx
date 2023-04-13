import { Link } from 'react-router-dom';
import './Card.css'

export default function Card(props) {
    return (
        <div className='rotate-vertical-center'>
        <div className='div_card'>
            <div className='div_img'>
                <Link to={`/detail/${props.id}`}>
                    <img src={props.flag} alt={props.name} />
                </Link>
            </div>
            <div className='div_detail'>
                <h3>{ props.name }</h3>
                <p>{ props.continent }</p>
                <Link to={`/detail/${props.id}`}>
                    <button className='btn_viewDetails'>
                        <span className='btn_text'> Details </span>
                    </button>
                </Link>
            </div>
        </div>
        </div>
    )
}