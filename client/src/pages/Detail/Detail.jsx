import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Activity from "../../components/Activity/Activity.jsx";
import { getCountryByIdAction } from "../../redux/actions";
import './Detail.css'

export default function Detail() {
  const dispatch = useDispatch();
  const { detailId } = useParams();

  useEffect(() => {
    dispatch(getCountryByIdAction(detailId));
  }, [dispatch, detailId])

  const country = useSelector(state => state.country);
  
  const countryActivities = country.activities;

  return (
    <div className="detail-container">
      <div>
        <img className="detail-flag" src={country.flag} alt={country.name} />    
      </div>
      <div className="detail-info">
        <h1 className="detail-title">{country.name} ({country.id})</h1>  
        <ul className="detail-list">
          <li><span>Capital: </span>{country.capital}</li>
          <li><span>Continent: </span>{country.continent}</li>
          <li><span>Subregion: </span>{country.subregion}</li>
          <li><span>Population: </span>{country.population}</li>
          <li><span>Area: </span>{country.area}</li>
        </ul>
      </div>
      <div >
        {countryActivities?.length!==0 && <h2>Activities</h2> } 
        <table className="detail-activities-table">    
          {countryActivities?.length!==0 &&
          <tbody>
            <tr>
              <th>Activity</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Season</th>
            </tr>
          </tbody>
          }     
          {countryActivities?.map((act) => {
            return <Activity
              name        = {act.name}
              difficulty  = {act.difficulty}
              duration    = {act.duration}
              season      = {act.season}
              key         = {act.id}
            />
          })}     
        </table>
      </div>
    </div>
  )
}
