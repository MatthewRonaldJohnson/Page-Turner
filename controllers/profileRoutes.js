const router = require('express').Router();
const { Post, User, Comment, Books } = require('../models');
const sequelize = require('../config/connection');

const { resolve } = require('path');
const { uploader, cloudinaryConfig } = require('../config/cloudinaryConfig')
const { multerUploads, fileP } = require('../utils/multer');

router.get('/:id', async (req, res) => {
    const rawUserData = await User.findByPk(req.params.id, {
        include: [{
            model: Post,
            include: [{
                model: Books
            }]
        }]
    });
    const userData = rawUserData.get();
    const posts = [];
    for (let i = 0; i < userData.posts.length; i++) {
        posts.push(JSON.parse(JSON.stringify(userData.posts[i])))
    }
    userData.posts = posts;
    const owner = req.session.userId == req.params.id ? true: false;
    res.render('profile', { userData, userId: req.session.userId, owner })
})

router.get('/update/:id', async (req, res) => {
    const rawUserData = await User.findByPk(req.params.id);
    const userData = rawUserData.get();
    res.render('update-profile', { userData, userId: req.session.userId })
})

router.post('/imgUpload', cloudinaryConfig, multerUploads, async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).redirect('/profile/update/' + req.session.userId)
        }
        const file = fileP(req).content;
        const result = await uploader.upload(file)
        const image = result.url;
        await User.update(
            {
                profile_pic: image,
            },
            {
                where: {
                    id: req.session.userId,
                }
            })
        res.status(200).redirect('/profile/update/' + req.session.userId)
    } catch (error) {
        res.status(500).redirect('/profile/' + req.session.userId)
    }
})

module.exports = router;