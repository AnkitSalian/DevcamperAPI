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

const {protect, authorize} = require('../middleware/auth');

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

//Re-route into resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;