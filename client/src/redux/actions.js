import axios from "axios";
import { GET_COUNTRIES, GET_COUNTRY, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITIES, GET_ACTIVITIES, SEARCH_BY_NAME, RESET } from "./action_type";

/* const URL = 'http://localhost:3001'; */

export const getCountriesAction = () => {
    return async function (dispatch) {
        const countriesData = (await axios.get(`countries`)).data;
        dispatch({
            type: GET_COUNTRIES,
            payload: countriesData,
        });
    }
}

export const getCountryByIdAction = (idCountry) => {
    return async function (dispatch) {
        const countryData = (await axios.get(`countries/${idCountry}`)).data;
        dispatch({
            type: GET_COUNTRY,
            payload: countryData,
        });
    }
}

export function searchByName(name) {
    return async function (dispatch) {
        try {
            const countrySearchData = (await axios.get(`countries/name/${name}`)).data;
            countrySearchData?.length ? 
            dispatch({
                type: SEARCH_BY_NAME,
                payload: countrySearchData,
            }) :
            dispatch({
                type: SEARCH_BY_NAME,
                payload: [],
            });
            
        } catch (error) {
            dispatch({
                type: SEARCH_BY_NAME,
                payload: [],
            });
        }
    }
}

export const getActivitiesAction = () => {
    return async function (dispatch) {
        const activitiesData = (await axios.get(`activities`)).data;
        dispatch({
            type: GET_ACTIVITIES,
            payload: activitiesData,
        });
    }
}

export function orderByName(ordering) {
    return {
        type: ORDER_BY_NAME,
        payload: ordering
    }
}

export function orderByPopulation(ordering) {
    return {
        type: ORDER_BY_POPULATION,
        payload: ordering
    }
}

export function filterByContinent(filter) {
    return {
        type: FILTER_BY_CONTINENT,
        payload: filter
    }
}

export function filterByActivities(filter) {
    return {
        type: FILTER_BY_ACTIVITIES,
        payload: filter
    }
}

export function reset() {
    return {
        type: RESET,
    }
}