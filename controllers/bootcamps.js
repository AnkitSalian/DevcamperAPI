const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamps');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults);
    
    
});

// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: true,
            data: bootcamp
        })
    
});

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        })
});

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    
});

// @desc     Delete a bootcamps
// @route    DELETE /api/v1/bootcamps/:id
// @access   private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }

        bootcamp.remove();

        res.status(200).json({
            success: true,
            data: {}
        })
    
});

// @desc     Get bootcamps within a radius
// @route    GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access   private
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
    
    const {zipcode, distance} = req.params;

    //Get latitude/longitude from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calculate radius using radians
    //Divide distance by radius of earth
    //Earth radius = 3,963 miles or 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [lng, lat], radius]}}
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});

// @desc     Upload photo for bootcamps
// @route    PUT /api/v1/bootcamps/:id/photo
// @access   private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }

    if(!req.files){
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;
    
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload a image file`, 400));
    }

    //Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    //Crate filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err){
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {
            photo: file.name
        })

        res.status(200).json({
            success: true,
            data: file.name
        })
    })

});