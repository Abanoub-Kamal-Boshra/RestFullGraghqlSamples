const express = require('express');
require('../helpers/dbConnection');
const { errorHandler } = require('../middlewares');
const { Article } = require('../models');
const { getArtcleHateos } = require('../helpers/constants');

const articleRouter = express.Router();


// article router
articleRouter.get('/', async (req, res) => {
    console.log(req);
    const articleHateos = getArtcleHateos('https://', 'localhost')

    res.status(200).send(articleHateos);
});

articleRouter.get('/articles', async (req, res, next) => {
    try {
        const artcles = await Article.find({});
        res.status(200).send(artcles);
    } catch (error) {
        next(error);
    }
})


articleRouter.get('/:article_id', async (req, res, next) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const artcle = await Article.findById(req.params.article_id);
        res.status(200).send(artcle);
    } catch (error) {
        next(error);
    }
})



articleRouter.get('/:article_id/comments', async (req, res, next) => {

    try {
        const comments = await Article.findById(req.params.article_id)
        .populate('comments')
        .select('comments');
        res.send(comments);
    } catch (error) {
        next(error);
    }
})

articleRouter.get('/:article_id/author', async (req, res, next) => {

    try {
        const author = await Article.findById(req.params.article_id)
        .populate('author')
        .select('author');
        res.status(200).send(author);
    } catch (error) {
        next(error);
    }
})


//// article
// CREATE
articleRouter.post('/', async (req, res, next) => {
    // const {title, body, authorId} = req.body;
    // {title, body, author: authorId}

    try {
        const articleId = await Article.create(req.body);
        if(!articleId) throw('ERROR');
        res.status(200).send({success: true});
    } catch (err) {
        return next(err);
    }
});

// UPDATE
articleRouter.patch('/:articleId', async (req, res, next) => {
    // const {title, body, authorId} = req.body;
    // {title, body, author: authorId}
    const id = req.params.articleId;

    try {
        const articleId = await Article.updateOne({"_id": id}, {$set: req.body});
        if(!articleId) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});

// Delete
articleRouter.delete('/:articleId', async (req, res, next) => {
    const id = req.params.articleId;

    try {
        const articleId = await Article.deleteOne({"_id": id});
        if(!articleId) throw('ERROR');
        res.send({success: true});
    } catch (err) {
        return next(err);
    }
});




module.exports = {articleRouter};