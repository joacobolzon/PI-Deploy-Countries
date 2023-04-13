const validateActivity = (req, res, next) => {
    const seasons = ['summer', 'autumn', 'winter', 'spring'];
    const { name, duration, season, countryId } = req.body;
    
    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!duration) return res.status(400).json({ error: 'Missing duration' });
    if (!countryId) return res.status(400).json({ error: 'Missing countries' });
    if (!season) return res.status(400).json({ error: 'Missing season' });
    
    const findSeason = seasons.find( elem => elem === season.toLowerCase() );
    if (!findSeason) return res.status(400).json({ error: 'No season found' });
    
    next();
}

module.exports = validateActivity;