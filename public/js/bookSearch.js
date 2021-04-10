const bookSearchFrom = document.getElementById('bookSearchForm');
const bookSearchTarget = document.getElementById('bookSearch');
const resultDisplay = document.getElementById('searchResultDisplay')

const createBookCard = function(book){
    try {
        const isbn = book.industryIdentifiers.find(element => element.type === "ISBN_13").identifier;
        const card = document.createElement('section')
        card.innerHTML = `
        <section class="row border py-3 my-3 bookSection" data-isbn="${isbn}" 
        data-cover="${book.imageLinks.smallThumbnail}" 
        data-author="${book.authors[0]}" data-title="${book.title}">
                <div class="col-3 text-center">
                    <img src="${book.imageLinks.smallThumbnail}" 
                    alt="${book.title}">
                </div>
    
                <div class="col-9 d-flex flex-column justify-content-center align-items-center">
                    <h2>${book.title}</h2>
                    <h4>By: ${book.authors[0]}</h4>
                </div>
            </section>
        `
        resultDisplay.appendChild(card)
    } catch {
        //skips over any results w/o required info
        return
    }
}

const formHandler = async function(e){
    e.preventDefault();
    resultDisplay.innerHTML = '';
    if (!bookSearchTarget.value) {
        alert('Have to give a value to search')
        return
    }
    const bookData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearchTarget.value}`);
    const {items} = await bookData.json();
    items.forEach(book => createBookCard(book.volumeInfo));
}

const makeNewPost = async function(e){
    if(!e.target.dataset.isbn) return //prevents fetch from firing if clicked on white space
    const response = await fetch('/addBook', {
        method: 'POST',
        body: JSON.stringify({
            isbn: e.target.dataset.isbn,
            cover_img_url: e.target.dataset.cover,
            title: e.target.dataset.title,
            author: e.target.dataset.author
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    console.log(response)
    if(response.ok){
        location = `/newPost/${e.target.dataset.isbn}`
    }
}


bookSearchFrom.addEventListener('submit', formHandler);
resultDisplay.addEventListener('click', makeNewPost);