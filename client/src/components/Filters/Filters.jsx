import { useSelector, useDispatch } from 'react-redux';
import { orderByName, orderByPopulation, filterByContinent, filterByActivities, searchByName, reset } from "../../redux/actions";
import './Filters.css'

export default function Filters({ pagination }) {
    const activities = useSelector(state => state.activities); //Obteniendo el estado de las actividades listadas

    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        const { name, value } = e.target;
        pagination(1)
        if (name === 'orderByName') dispatch(orderByName(value));
        if (name === 'orderByPopulation') dispatch(orderByPopulation(value));
        if (name === 'filterByContinent') dispatch(filterByContinent(value));
        if (name === 'filterByActivities') dispatch(filterByActivities(value));
        if (name === 'search') dispatch(searchByName(value));
    }
    return (
        <div className='div_containerFilter'>
            <div className='div_searchName'>
                <input type="text" name="search" placeholder="Search..." onChange={handleClick} />
            </div>

            <div className='div_filterSelectors'>
                <select name='orderByName' defaultValue={'DEFAULT'} onChange={handleClick}>
                    <option value="DEFAULT" disabled>Sort by name</option>
                    <option value="Increasing">aA - zZ</option>
                    <option value="Decreasing">zZ - aA</option>
                </select>
            </div> 

            <div className='div_filterSelectors'>
                <select name='orderByPopulation' defaultValue={'DEFAULT'} onChange={handleClick}>
                    <option value="DEFAULT" disabled>Population</option>
                    <option value="Increasing">Increasing</option>
                    <option value="Decreasing">Decreasing</option>
                </select>
            </div>
            
            <div className='div_filterSelectors'>
                <select name='filterByContinent' defaultValue={'DEFAULT'} onChange={handleClick}>
                    <option value="DEFAULT" disabled>Continent</option>
                    <option value="Asia">Asia</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                </select>
            </div>

            <div className='div_filterSelectors'>
                {(activities?.length === 0)? 
                    <select defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>No activities yet</option>
                    </select> 
                    :
                    <select name='filterByActivities' defaultValue={'DEFAULT'} onChange={handleClick}>
                        <option value="DEFAULT" disabled>Activities</option> 
                        {activities?.map(activity => (
                        <option value={activity.name} key={activity.id}>{activity.name}</option>
                        ))}
                    </select> 
                }
            </div>

            <div className='div_btnReset'>
                <button className='global_button' onClick={() => dispatch(reset())}>
                    Reset filters
                </button>
            </div>
        </div>
    )
}