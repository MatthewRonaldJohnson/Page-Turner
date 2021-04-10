const router = require('express').Router();
const { Post, User, Comment, Books } = require('../models');
const sequelize = require('../config/connection');
const fetch = require('node-fetch')
const checkAuth = require('../utils/checkAuth')


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
    for (let i = 0; i < postData.length; i++) {
        const user = JSON.parse(JSON.stringify(postData[i].User));
        postData[i].userName = user.username;
        const book = JSON.parse(JSON.stringify(postData[i].book));
        postData[i].cover_img_url = book.cover_img_url;
        postData[i].book_title = book.title;
    }
    //render homepage
    res.render('homepage', { postData, userId: req.session.userId})
    //res.json(postData)
})

// /members, shows member cards 
router.get('/members',checkAuth, async (req, res) => {
    //get user data
    const rawUserData = await User.findAll()
    //serialize it
    const userData = rawUserData.map(user => user.get())
    //render members page
    res.render('members', {userData, userId: req.session.userId})
    //res.json(userData)
})

// /search/:search-term, search bar, returns list of results frm google books api, and checks if we have reviews for those books
router.get('/search/:searchTerm',checkAuth, async (req, res) => {
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
    res.render('searchResults', {books, userId: req.session.userId})
})

router.get('/post/:id',checkAuth, async (req, res) => {
    try {//find the specificed post and all associated data
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
        const user = JSON.parse(JSON.stringify(postData.User));
        postData.userName = user.username;
        const book = JSON.parse(JSON.stringify(postData.book));
        postData.cover_img_url = book.cover_img_url;
        postData.book_title = book.title;
        const commentArr = postData.comments.map(comment => JSON.parse(JSON.stringify(comment)))
        postData.commentArr = commentArr;
        //render page
        res.render('single-post', {postData, userId: req.session.userId});
        //res.json(postData)
    } catch (error) {
        console.log(error)
        res.redirect('/404')
    }
})

router.get('/book/:isbn',checkAuth, async (req, res) => {
    try {
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
        res.render('booksinDatabase', {bookData, userId: req.session.userId})
        //res.json(bookData)
    } catch (error) {
        res.redirect('/404')
    }
})

router.get('/login', (req, res) => {
    res.render('login', {userId: req.session.userId})
})

router.get('/signup', (req, res) => {
    res.render('sign-up', {userId: req.session.userId})
})

router.get('/bookSearch',checkAuth, (req,res) => {
    res.render('bookSearch', {userId: req.session.userId})
})

router.post('/addBook',checkAuth, async (req,res) => {
    //check if book is in database, if not add it
    const findBook = await Books.findByPk(req.body.isbn);
    if(findBook) { //if book is already in database don't do anything else
        res.end();
        return;
    }
    const newBook = await Books.create(req.body)
    res.end(newBook);
})

router.get('/newPost/:isbn', checkAuth, (req,res) => {
    res.render('new-post', {isbn: req.params.isbn, userId: req.session.userId})
})

module.exports = router;