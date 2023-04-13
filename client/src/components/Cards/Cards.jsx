import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useSelector } from 'react-redux';
import './Cards.css'

export default function Cards({ indexOfFirstCountry, indexOfLastCountry, countriesPerPage, pagination }) {
    const countries = useSelector(state => state.countries); //Obteniendo el estado de los países listados

    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const handleRefreshPage = () => {
        window.location.reload();
      };
    
    return (
        <>
            <div className="div_cards">
                {countries?.length === 0 ?
                    <span>
                    <p>Country Not Found</p>
                    <button onClick={handleRefreshPage}>Refresh</button>
                    </span>
                    :
                    currentCountries?.map((country) => {
                        return <Card
                            id={country.id}
                            flag={country.flag}
                            name={country.name}
                            continent={country.continent}
                            key={country.id}
                        />
                    })}
            </div>
            <Pagination
                countriesPerPage={countriesPerPage}
                allCountries={countries.length}
                pagination={pagination}
            />
        </>
    )
}