const errorHandler = (err, req, res, next) => {

    //Log to console
    console.log(err.stack.red);
    
    res.status(err.statuscode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

module.exports = errorHandler;