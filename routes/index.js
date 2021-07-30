const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const usermiddleware = require('../middleware/reqlogin')
const adminmiddleware = require('../middleware/adminmiddleware')
const User = mongoose.model('User')
router.post('/add', usermiddleware, (req, res) => {
    const { like } = req.body
    console.log(like);
    User.findByIdAndUpdate(req.user._id, {
        $push: { like: like }
    }, { new: true }).then(data => {
        res.json("Success")
    })
})
router.post('/liked', usermiddleware, (req, res) => {
    res.json(req.user.like)
    // console.log(req.user.list);
})
router.post('/dislike', usermiddleware, (req, res) => {
    const { id } = req.body
    var arr = req.user.like.filter(item => {
        return id != item.imdbID
    })
    User.findByIdAndUpdate(req.user._id, {
        like: arr
    }, { new: true }).then(() => {
        res.json('success')
    })
})

module.exports = router