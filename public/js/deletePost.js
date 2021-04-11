const deleteButton = document.getElementById("delete")
const updateButton = document.getElementById('update')

updateButton.addEventListener('click', function(){
    location = '/update/post/'+id
})


deleteButton.addEventListener("click",async function(){
    const response = await fetch("/api/post/"+id,{
        method:"DELETE"
    })
    if (response.ok){
        location="/"
    } else{
        alert("post couldn't be deleted")
    }
    
})