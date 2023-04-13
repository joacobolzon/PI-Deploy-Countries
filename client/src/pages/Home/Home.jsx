import Cards from "../../components/Cards/Cards.jsx";
import Filters from "../../components/Filters/Filters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountriesAction, getActivitiesAction } from "../../redux/actions";
import { useState } from "react";
import './Home.css'

export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesAction());
    dispatch(getActivitiesAction());
  }, [dispatch])


  //Control del paginado
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;


  const pagination = (pageNumber) => { 
      setCurrentPage(pageNumber);
  }
  
  return (
    <div className="div_Home">
      <Filters pagination={pagination} />
      <Cards 
        indexOfFirstCountry={indexOfFirstCountry} 
        indexOfLastCountry={indexOfLastCountry} 
        pagination={pagination}
        countriesPerPage={countriesPerPage}
      />
    </div>
  )
}