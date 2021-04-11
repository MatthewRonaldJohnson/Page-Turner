const form = document.getElementById('newPostForm')

form.addEventListener('submit',  async function(e){
    e.preventDefault();
    const title = document.getElementById('title').value
    const body = document.getElementById('body').value
    const rating = document.getElementById('success-outlined').checked

    if(!(title && body)) {
        alert('Your post must have a title and a body!')
    }

    const newPost = {
        title,
        rating,
        body,
        book_isbn
    }

    const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    const {id} = await response.json()

    location = `/post/${id}`
})