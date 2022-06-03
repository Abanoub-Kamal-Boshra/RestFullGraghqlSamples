const express = require('express');
require('../helpers/dbConnection');
const { errorHandler } = require('../middlewares');
const { User, Article } = require('../models');
const { getBlogsHateos, getArtcleHateos } = require('../helpers/constants');

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    // const {firstname, email} = req.body;
    // { firstname, email }
    try {
        await User.create(req.body);
        res.send({success: true});
    } catch (err) {
        next(err);
    }
});

userRouter.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
})

userRouter.get('/:user_id', async (req, res, next) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
})


userRouter.get('/:user_id/articles', async (req, res, next) => {

    try {
        const articles = await Article.findById(req.params.user_id)
        .populate('articles')
        .select('articles');
        res.send(articles);
    } catch (error) {
        next(error);
    }
})

// SUSPEND
userRouter.post('/:userId/suspend', async (req, res, next) => {
    const id = req.params.userId;

    try {
        const result = await User.updateOne({"_id": id}, {$set: {isSuspended: true}});
        if(!result) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});

// unSUSPEND
userRouter.post('/:userId/unSuspend', async (req, res, next) => {
    const id = req.params.userId;

    try {
        const result = await User.updateOne({"_id": id}, {$set: {isSuspended: false}});
        if(!result) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});


module.exports = {userRouter};