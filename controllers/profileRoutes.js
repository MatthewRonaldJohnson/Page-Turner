const router = require('express').Router();
const { Post, User, Comment, Books } = require('../models');
const sequelize = require('../config/connection');

const { resolve } = require('path');
const { uploader, cloudinaryConfig } = require('../config/cloudinaryConfig')
const { multerUploads, dataUri } = require('../utils/multer');

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
    console.log(userData.posts)
    res.render('profile', { userData, userId: req.session.userId})
})

router.get('/update/:id', async (req, res) => {
    const rawUserData = await User.findByPk(req.params.id);
    const userData = rawUserData.get();
    res.render('update-profile', { userData, userId: req.session.userId})
})

router.use('*', cloudinaryConfig);

router.post('/imgUpload', multerUploads, (req, res) => {
    console.log(req.file);
    res.end();
    // if(req.file) {
    //     const file = dataUri(req).content;
    //     return uploader.upload(file).then((result) => {
    //         const image = result.url;
    //         return res.status(200).json({
    //             message: "upload complete",
    //             data: {image},
    //         })
    //     }).catch((error) => res.status(400).json({
    //         message: 'failure',
    //         data: {error}
    //     }))
    // }
})

module.exports = router;