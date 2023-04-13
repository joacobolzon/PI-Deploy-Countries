const { Activity } = require('../db');

const getAllActivities = async (req,res) =>{ 
    try {
        const allActivities = await Activity.findAll();
        allActivities.length === 0
        ? res.status(400).json({error:'No activities created'})
        : res.status(200).json(allActivities)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const createActivity = async(name, difficulty, duration, season, countryId) => {
    const newActivity = await Activity.create( {
        name, 
        difficulty, 
        duration,
        season
    } );
    await newActivity.setCountries(countryId);
    return newActivity;
}

const postActivity = async(req,res) => {
 const { name, difficulty, duration, season, countryId } = req.body;
    try {
        const seasonLowerCase = season.toLowerCase();
        const newActivityCreated = await createActivity(name, difficulty, duration, seasonLowerCase, countryId);
        res.status(200).send('Activity created!'); 
    } catch (error) {
       res.status(400).json({ error: error.message });        
    }
}

module.exports = {
    getAllActivities,
    postActivity
}