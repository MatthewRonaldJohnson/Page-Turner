const addButton = document.getElementById("addComment");
const form = document.getElementById("newIdForm");


addButton.addEventListener("click", function(){
addButton.hidden = true
form.hidden= false
}); 

form.addEventListener("submit", async function(e){
e.preventDefault();
addButton.hidden = false
form.hidden= true

const comment = document.getElementById("comment").value
const post_id = window.location.href.charAt(window.location.href.length-1)
 await fetch ('/api/comment', { 
     method: "POST",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify({
        body: comment,
        post_id
     })
 }) 
 location = location

}); 

