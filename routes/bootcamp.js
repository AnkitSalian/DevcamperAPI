const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `View all bootcamps`
    })
});

router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Get bootcamp ${req.params.id}`
    })
});

router.post('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Create new bootcamp`
    })
});

router.put('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Updated bootcamp ${req.params.id}`
    })
});

router.delete('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Deleted bootcamp ${req.params.id}`
    })
});

module.exports = router;