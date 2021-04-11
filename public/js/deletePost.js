const deleteButton = document.getElementById("delete")



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