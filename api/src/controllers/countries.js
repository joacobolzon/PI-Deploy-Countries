const axios = require('axios');
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");

const mapCountry = (e) => ({
  id: e.cca3,
  name: e.name.common,
  flag: e.flags[0],
  continent: e.continents[0],
  capital: e.capital ? e.capital[0] : 'Capital not found',
  subregion: e.subregion,
  area: Number(e.area),
  population: e.population,
});

const saveCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    const countries = response.data.map(mapCountry);
    const result = await Country.bulkCreate(countries, { ignoreDuplicates: true });
    console.log('Countries saved:', result.length);
  } catch (error) {
    console.error('Failed: ', error);
  }
};

const getAll = async (req, res) => {
  try {
    const countries = await Country.findAll({
      attributes: ['id', 'flag', 'name', 'continent', 'population'],
      include: {
        model: Activity,
        attributes: ["name"]
      }
    });
    res.status(200).json(countries);
  } catch (error) {
    res.status(400).json({ message: 'Error trying to get countries' });
  }
}


const getCountryById = async (req, res) => {
  const { idCountry } = req.params;
  try {
    
    const country = await Country.findOne({
      where: { id: { [Op.iLike]: idCountry }},
        include: {
          model: Activity,
          attributes: ["name" , "difficulty" , "duration", "season"]
        }
    });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

const getCountryByName = async (req, res) => {
  const {name} = req.params
  try {
    const countryFound = await Country.findAll({ where: { 
      name: { [Op.iLike]: '%' + name + '%'}
     }})
     countryFound.length === 0
     ? res.status(400).json({error: 'There is no countries with that name'})
     : res.status(200).json(countryFound)
  } catch (error) {
    res.status(404).json({error : error.message})
  }
}




module.exports = {
  saveCountries,
  getAll,
  getCountryById,
  getCountryByName
};