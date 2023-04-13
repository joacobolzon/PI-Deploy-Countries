const regexTime = /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/;

export default function validation(data) {
    const errors = {};
    // Name validation
    // if (!data.name) errors.name = 'Missing activity name';

    // else if (!data.name.length > 35) errors.name = 'The activity name cannot be longer than 35 characters.';
    
    // Difficulty validation
    if (!data.difficulty) errors.difficulty = 'Missing difficulty value';

    else if (data.difficulty > 5) errors.difficulty = 'Difficulty value cannot be greater than 5';
    
    else if (data.difficulty < 1) errors.difficulty = 'Difficulty value cannot be less than 1';
    
    // Duration validation
    if (!data.duration) errors.duration = 'Missing duration time value';

    else if (data.duration === '00:00:00') errors.duration = 'Duration time value cannot be 00:00:00';

    else if (!regexTime.test(data.duration)) errors.duration = 'Duration time value has been this format HH:MM:SS';
    
    // Season validation
    let flagSeason = 0; //Bandera para determinar si la temporada coincide con alguna permitida
    const seasonLowerCase = data.season.toLowerCase();

    if (!data.season) errors.season = 'Missing season';

    else if (seasonLowerCase === 'summer' || seasonLowerCase === 'autumn' || seasonLowerCase === 'winter' || seasonLowerCase === 'spring') flagSeason = 1;

    if (flagSeason === 0) errors.season = 'Season does not match any of the options';

    //Country validation
    if (!data.countryId?.length) errors.countryId = 'Select at least one Country';

    return errors;
}