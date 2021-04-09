const router = require('express').Router();
const { Post, User, Comment, Books } = require('../models');
const sequelize = require('../config/connection');
const fetch = require('node-fetch')


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
router.get('/search/:searchTerm', async (req, res) => {
    console.log('------------------------HIT-------------------')
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.searchTerm}`
    //search google books api
    const response = await fetch(url);
    const { items } = await response.json();
    //find books we have reviews for, filter out null results (aka books that don't have reviews in our database)

    const isbnArr = [];
    for (let i = 0; i < items.length; i++) {
        const target = items[i].volumeInfo.industryIdentifiers.find(element => element.type === "ISBN_13");
        isbnArr.push(target);
    }
    const goodIsbn = isbnArr.filter(data => data);
    const rawDbBooks = [];
    for (let i = 0; i < goodIsbn.length; i++) {
        rawDbBooks.push(await Books.findByPk(goodIsbn[i].identifier))
    }
    const booksInDb = rawDbBooks.filter(data => data);
    //serialize data 
    const books = booksInDb.map(book => book.get())
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
    res.render('single-post', postData);
    //res.json(postData)
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
    //res.json(bookData)
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;