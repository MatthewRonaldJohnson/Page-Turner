const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    //404 page, req ends up here if it doesn't hit any other routes (don't put any routes below this or they will be unreachable)
    res.status(404).send("<h1>404: Page Not Found</h1>")
})

module.exports = router;