import { GET_COUNTRIES, GET_COUNTRY, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITIES, GET_ACTIVITIES, SEARCH_BY_NAME, RESET } from "./action_type";

const initialState = {
    countries: [],
    countriesOrigin: [],
    country: [],
    activities: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countriesOrigin: action.payload
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case GET_COUNTRY:
            return {
                ...state,
                country: action.payload
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }

        case ORDER_BY_NAME:
            const orderNameCopy = [...state.countriesOrigin];
            const orderName = orderNameCopy.sort((a, b) => {
                if (a.name > b.name) return "Increasing" === action.payload ? 1 : -1;
                if (a.name < b.name) return "Decreasing" === action.payload ? 1 : -1;
                return 0;
            });
            return {
                ...state,
                countries: orderName
            };

        case ORDER_BY_POPULATION:
            const orderPopulationCopy = [...state.countriesOrigin];
            const orderPopulation = orderPopulationCopy.sort((a, b) => {
                if (a.population > b.population) return "Increasing" === action.payload ? 1 : -1;
                if (a.population < b.population) return "Decreasing" === action.payload ? 1 : -1;
                return 0
            });
            return {
                ...state,
                countries: orderPopulation
            };

        case FILTER_BY_CONTINENT:
            const filterContinent = [...state.countriesOrigin];
            const continentFiltered = filterContinent.filter(country => country.continent === action.payload);
            return {
                ...state,
                countries: continentFiltered
            }

        case FILTER_BY_ACTIVITIES:
            const filterByActivities = [...state.countriesOrigin];
            const activitiesFiltered = filterByActivities.filter(country => country.activities && country.activities.find(activity => activity.name === action.payload));
            return {
                ...state,
                countries: activitiesFiltered
            }

        case RESET:
            return {
                ...state,
                countries: [...state.countriesOrigin],
            };

        default:
            return { ...state };
    }
}

export default rootReducer;