const { Post } = require ('../models');

const postData = [
    {
        //the hobbit
        book_isbn: 9780345339683,
        title: "A real page turner",
        rating: true, 
        body: "There are some days when I actually think that the humble Hobbit is superior to it's bohemoth brother, The Lord of the Rings . It's a much tighter story, and Bilbo is a much more appeal character than is Frodo.",
        user_id: 1,
    },
    {
        //the color purple
        book_isbn: 9780156028356,
        title: "A gem of a novel",
        rating: true, 
        body: "It is a wise choice as it illustrates the world best. It is a wise choice as the feeling and soul truth of the book challenges our feelings of cultural superiority as we have nothing but grammar and style to defend against urgent truth with. 'Grammatical education'? ",
        user_id: 2,
    },

  {
      // Major Pett
        book_isbn: 9781408809327,
        title: "Take me to England!",
        rating: true, 
        body: "Major Ernest Pettigrew is a decent sort, 68, retired military, widowed, and coping with the death of his younger brother, Bertie. He is a respected fixture in a rural community, member of the local golf course club, romantic target for one of the local ladies, and defender of traditional values. ",
        user_id: 3,
    }, 
    {
        //The seed keeper
        book_isbn:9781571317322,
        title: "Seeds, a true symbol",
        rating: true, 
        body: "It's hard to think of a more literally or symbolically powerful object than a seed — a bond to the past, a source of sustenance in the present, and a promise for the future, a seed is physically tiny but enduring beyond measure.",
        user_id: 4, 
    },
    {
        //the law of innocence
        book_isbn: 9780316498029, 
        title: "Bosch world is my new excape!",
        rating: true, 
        body: "Wow! What a great read. This one is going to be my favorite of the year in the mystery/Legal Thriller category. Five and a half stars out of five. Full disclosure Connelly is one of my go-to favorites and it’s hard not to be a little biased. I like this book better than the last four or five of his Bosh novels. ",
        user_id: 6, 
    },
    {
        //miss benson's beetles
        book_isbn: 9780812996715, 
        title: "High Hopes, but didn't pan out",
        rating: false, 
        body: "While skimming some reviews once I was midway through Miss Benson’s Beetle, I saw several trigger warnings for animal abuse. ALERT, ALERT! Even though that would have made me pass entirely on the novel had I known it beforehand, I decided to keep going hoping it wasn’t too horrible.",
        user_id: 4, 
        
    },

]

    const seedPost = () => Post.bulkCreate(postData);

    module.exports = seedPost
