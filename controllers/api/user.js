const router = require('express').Router();
const { User } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

//create a new user, and log them in
// req.body needs to have
// username and password
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = newUserData.id;

            res
                .status(200)
                .json({ user: newUserData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        //if user cant log in, display this message to them explaining why
        res.status(400).json({ message: err.message })
    }
});

// login exisiting user
// req.body needs to have
// username and password
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                user_name: req.body.userName,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: "Couldn't find user, check your Username or Sign Up" });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password.' });
            return;
        }

        req.session.save(() => {
            req.session.userId = dbUserData.id;

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

// log out user
router.post('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', checkAuth, async (req, res) => {
    const updatedUserData = await User.update(req.body, { where: { id: req.params.id } })
    res.json(updatedUserData)
  })
  
  router.delete('/:id', checkAuth, async (req, res) => {
    const deletedUser = await User.destroy({ where: { id: req.params.id } })
    res.json(deletedUser)
  })

module.exports = router;