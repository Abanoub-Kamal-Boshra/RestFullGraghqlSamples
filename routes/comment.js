const express = require('express');
require('../helpers/dbConnection');
const { errorHandler } = require('../middlewares');
const { getBlogsHateos, getArtcleHateos } = require('../helpers/constants');
const { Comment } = require('../models');
const commentRouter = express.Router();



///// comment
// CREATE
commentRouter.post('/', async (req, res, next) => {
    // const {user, date, content} = req.body;

    try {
        const result = await Comment.create(req.body);
        if(!result) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});

// UPDATE
commentRouter.patch('/:commentId', async (req, res, next) => {
    // const {user, date, content} = req.body;
    const id = req.params.commentId;

    try {
        const result = await Comment.updateOne({"_id": id}, {$set: req.body});
        if(!result) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});

// Delete
commentRouter.delete('/:commentId', async (req, res, next) => {
    const id = req.params.commentId;

    try {
        const result = await Comment.deleteOne({"_id": id});
        if(!result) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});


module.exports = {commentRouter};