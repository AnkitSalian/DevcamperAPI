const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamps');
const asyncHandler = require('../middleware/async');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
   
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            data: bootcamps,
            count: bootcamps.length
        });
    
    
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
// @access   public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        console.log();
        
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        })
    
});