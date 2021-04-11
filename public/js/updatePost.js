const updatePostForm = document.getElementById('updatePostForm')

updatePostForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const title = document.getElementById('title').value
        const body = document.getElementById('body').value
        const rating = document.getElementById('success-outlined').checked

        if (!(title && body)) {
            alert('Your post must have a title and a body!')
        }

        const updatedPost = {
            title,
            rating,
            body,
        }

        console.log(updatedPost)
        console.log('/api/post/' + postId)

       
        const response = await fetch('/api/post/' + postId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
        await response.json()
        location = `/post/${postId}`
    } catch (error) {
        console.log(error)
    }

})