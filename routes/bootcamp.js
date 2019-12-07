const express = require('express')
const router = express.Router()

const {
    createBootcamp, 
    deleteBootcamp, 
    getBootcamp, 
    getBootcamps, 
    updateBootcamp,
    getBootcampInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamps');
const advancedResults = require('../middleware/advancedResults');

//Include other resource router
const courseRouter = require('./courses');

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

//Re-route into resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;