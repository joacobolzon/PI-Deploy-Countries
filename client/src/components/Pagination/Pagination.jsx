import './Pagination.css'

export default function Paged({ countriesPerPage, allCountries, pagination }) {
    const pageNumbers = [];

    /**
     * Match.ceil devuelve el entero mayo o igual más próximo al número dado
     * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    */    
    for (let i = 1; i <= Math.ceil(allCountries/ countriesPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div className="paged-container">
            {
                pageNumbers &&
                pageNumbers.map(number => (
                    <button 
                    className='btn_pagination'
                    key={number} onClick={() => pagination(number)}>{number}</button>
                ))
            }

        </div>
    );
    }