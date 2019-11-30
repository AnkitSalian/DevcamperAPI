// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `View all bootcamps`
    })
};

// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Get bootcamp ${req.params.id}`
    })
};

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Create new bootcamp`
    })
};

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated bootcamp ${req.params.id}`
    })
};

// @desc     Delete a bootcamps
// @route    DELETE /api/v1/bootcamps/:id
// @access   public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted bootcamp ${req.params.id}`
    })
};