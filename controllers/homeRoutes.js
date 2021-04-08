const router = require('express').Router();
const { Post, User, Comment, Books } = require('../models');

// / : homepage, shows 10 most recent reviews
router.get('/', async (req, res) => {
    //get review data
    const rawPostData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username']
        },
        { model: Books },
        ],
        limit: 10,
        order: sequelize.literal('post.created_at DESC')
    })
    //serialize it
    const postData = rawPostData.map(post => post.get())
    //render homepage
    res.render('homepage', postData)
})

// /members, shows member cards 
router.get('/members', async (req, res) => {
    //get user data
    const rawUserData = await User.findAll({
        attributes: ['id', 'username']
    })
    //serialize it
    const userData = rawUserData.map(user => user.get())
    //render members page
    res.render('members', userData)
})

// /search/:search-term, search bar, returns list of results frm google books api, and checks if we have reviews for those books
router.get('/search/:search-term', async (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.search - term}`
    //search google books api
    const { items } = await fetch(url);
    //find books we have reviews for, filter out null results (aka books that don't have reviews in our database)
    const rawDbBooks = items.map(async (book) => await Books.findByPk(book.volumeInfo.industryIdentifiers[0].identifier)).filter(data => data);
    //serialize data 
    const books = rawDbBooks.map(book => book.get())
    //render search page
    res.render('search', books)
})

router.get('/post/:id', async (req, res) => {
    //find the specificed post and all associated data
    const rawPost = await Post.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['id', 'username']
        },
        { model: Books },
        {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'] }],
        },
        ]
    });
    //serialize that data
    const postData = rawPost.get();
    //render page
    res.render('post', postData);
})

router.get('/book/:isbn', async (req, res) => {
    //find book, any reviews for it (and their authors)
    const rawBook = await Books.findByPk(req.params.isbn, {
        include:
            [{
                model: Post,
                include: [{
                    model: User,
                    attributes: ['id', 'username']
                }]
         }]
    })
    //serialize data
    const bookData = rawBook.get();
    //render page
    res.render('book', bookData)
})

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports.router;