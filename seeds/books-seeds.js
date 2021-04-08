const { Books } = require("../models/Books");

const booksData = [
  {
    isbn: 9780345339683,
    title: "The Hobbit, Or There and Back Again",
    cover_img_url: "http://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "John Ronald Reuel Tolkien",
  },
  {
    isbn: 9781408809327,
    title: "Major Pettigrew's Last Stand",
    cover_img_url: "http://books.google.com/books/content?id=ql9s8GIj06kC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "Helen Simonson",
  },

  {
    isbn: 9781571317322,
    title: "The Seed Keeper",
    cover_img_url:"http://books.google.com/books/content?id=XVElEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "Diane Wilson",
  },
  {
    isbn: 9780679645122,
    title: "Perfect",
    cover_img_url: "http://books.google.com/books/content?id=jSgUAAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "Rachel Joyce",
  },
  {
    isbn: 9780156028356,
    title: "The Color Purple",
    cover_img_url: "http://books.google.com/books/content?id=_lzUlQQv3XAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "Alice Walker",
  },
  {
    isbn: 9780316498029,
    title:"The Law of Innocence",
    cover_img_url:"http://books.google.com/books/content?id=bGXSDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    author: "Michael Connelly"
  },
];

const seedsBooks = () => Books.bulkCreate(booksData);

module.exports = seedsBooks