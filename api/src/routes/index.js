const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require('../controllers/countries.js')
const activities = require('../controllers/activities.js')
const validationActivity = require('../validations/validationActivity.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries/', countries.getAll);

router.get('/countries/:idCountry', countries.getCountryById)

router.get('/countries/name/:name', countries.getCountryByName)

router.post('/activities', validationActivity, activities.postActivity);

router.get('/activities', activities.getAllActivities)



countries.saveCountries();

module.exports = router;
