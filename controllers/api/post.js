const router = require('express').Router();
const { Post } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

router.post('/', checkAuth, async (req,res) => {
    //req.body needs to have
    //title, rating, body, book_isbn
    // req.body.user_id = req.session.userId;
    req.body.user_id = 1;
    const newPost = await Post.create(req.body);
    res.json(newPost);
})

router.put('/:id', checkAuth, async (req,res) => {
    const updatedPost = await Post.update(req.body, {
        where: {id: req.params.id}
    });
    res.json(updatedPost)
})

router.delete('/:id', checkAuth, async (req, res) => {
    const deletedPost = await Post.destroy({
        where: {id: req.params.id}
    })
    res.json(deletedPost)
})

module.exports = router;