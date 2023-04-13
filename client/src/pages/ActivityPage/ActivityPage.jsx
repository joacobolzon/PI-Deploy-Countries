import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getCountriesAction } from '../../redux/actions';
import validation from './validation.js';
import './ActivityPage.css'

export default function Activities() {
    const countries = useSelector(state => state.countriesOrigin);

    const dispatch =  useDispatch();

    useEffect(() => {   
        dispatch(getCountriesAction())
    }, [dispatch])

    // Creando el state para el formulario
    const [form, setForm] = useState({
        name: '',
        difficulty: '', 
        duration: '', 
        season: '', 
        countryId: []
    });

    const [countriesName, setCountriesName] = useState({ countries: [] }); // Para manejar los Países que se han seleccionado
    
    // Creando manejo de errores para el formulario
    const [errors, setErrors] = useState({
        name: '',
        difficulty: '', 
        duration: '', 
        season: '', 
        countryId: ''
    });

    // Actualizando el estado del formulario
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if(property === 'countryId') {
            const countryName = event.target.options[event.target.selectedIndex].text; 
            const countryData = {
                id: value, 
                countryName
            }
            setForm({
                ...form,
                countryId: [...form.countryId, value]
            })
            setCountriesName({
                ...countriesName,
                countries: [...countriesName.countries, countryData]
            });
        } else {
            setForm({
                ...form,
                [property]: value
            });
        }

        //Validando datos de cada input del formulario
        setErrors(validation({
            ...form,
            [property]: value
        })) 
    }

    function handleDelete(idCountry) {
        setForm({
            ...form,
            countryId: form.countryId.filter((country) => country !== idCountry)

        })
        setCountriesName({
            ...countriesName,
            countries: countriesName.countries.filter((country) => country.id !== idCountry)
        });

        setErrors(validation({
            ...form,
            countryId: form.countryId.filter((country) => country !== idCountry)
        })) 
        
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('/activities', form)
            .then(res   => {alert(res.data); window.location.reload(true)})
            .catch(err  => alert(err.response.data.error))
    }

    return (
        <div className="div_containerActivity">
            <h1>Create a new Activity</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name of the activity: </label>
                    <input type="text" value={form.name} onChange={changeHandler} name='name' />
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div className="div_containerSelectors">
                    <label>Difficulty: </label>
                    <select name="difficulty" defaultValue={'DEFAULT'} onChange={changeHandler}>
                        <option value="DEFAULT" disabled>Sort by difficulty</option>
                        <option value="1">💥 </option>
                        <option value="2">💥💥 </option>
                        <option value="3">💥💥💥 </option>
                        <option value="4">💥💥💥💥 </option>
                        <option value="5">💥💥💥💥💥</option>
                    </select>
                </div>

                <div>
                    <label>Duration: </label>
                    <input type="time" name="duration" step="2" value={form.duration} onChange={changeHandler}  />
                    {errors.duration && <span>{errors.duration}</span>}
                </div>

                <div className="div_containerSelectors">
                    <label>Season: </label>
                    <select name="season" onChange={changeHandler} defaultValue={''}>
                            <option value='' disabled>Select Season</option>
                            <option value="summer">Summer</option>
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                            <option value="spring">Spring</option>
                        </select>
                    {errors.season && <span>{errors.season}</span>}
                </div>

                <div className="div_containerSelectors">                    
                    <label>Country: </label>
                    <select id='country' name='countryId' defaultValue={''} onChange={changeHandler}>
                        <option value="" disabled>Select countries...</option> 
                        {countries?.map(country => (
                        <option value={country.id} key={country.id}>{country.name}</option>
                        ))}
                    </select>
                    {errors.countryId && <span>{errors.countryId}</span>}
                </div>

                <div className="div_containerCountries">
                {countriesName.countries?.map((country) => {
                return (
                    <div key={country.id}>
                        <p >{country.countryName}</p>
                        <button className="x" type='button' onClick={() => handleDelete(country.id)}>X</button>
                    </div>
                    );
                })}
                </div> 
                
                { Object.keys(errors).length === 0 ? 
                <button className="global_button" type="submit">Submit</button> : 
                <button className="global_button" type="submit" disabled>Submit</button>}
            </form>
        </div>
    )
}
