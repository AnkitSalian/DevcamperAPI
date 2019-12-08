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

const {protect} = require('../middleware/auth');

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

//Re-route into resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(protect, bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp);

module.exports = router;