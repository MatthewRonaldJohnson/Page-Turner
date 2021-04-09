const router = require('express').Router();
const { Comment } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

router.post('/', checkAuth, async (req, res) => {
    //req.body needs to have
    //body, post_id
    req.body.user_id = req.session.userId;
    const newComment = await Comment.create(req.body);
    res.json(newComment);
})

router.put('/:id', checkAuth, async (req, res) => {
    const updatedComment = await Comment.update(req.body, {
        where: {id: req.params.id}
    })
    res.json(updatedComment)
})

router.delete('/:id', checkAuth, async (req, res) => {
    const deletedComment = await Comment.destroy({
        where: {id: req.params.id}
    })
    res.json(deletedComment)
})

module.exports = router;