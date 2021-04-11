const bioForm = document.getElementById('bioForm');
const usernameForm = document.getElementById('usernameForm');
const passwordForm = document.getElementById('passwordForm');

const updateUser = async function(body){
    const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if(response.ok){
        location = location;
    } else{
        const message = await response.json()
        console.log(message)
        alert('Unable to update user.\n Message: '+ message)
    }
}


const bioFormHandler = async function (e) {
    e.preventDefault();
    const newBio = document.getElementById('bio').value.trim();
    const body = {bio: newBio};
    updateUser(body);
}

const usernameFormHandler = function (e) {
    e.preventDefault();
    const newUser = document.getElementById('newUser').value.trim();
    const body = {username: newUser};
    updateUser(body);
}

const passwordFormHandler = function (e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value.trim();
    const reNewPassword = document.getElementById('reNewPassword').value.trim();
    if (!(newPassword === reNewPassword)) {
        document.getElementById('newPassword').value.length = 0;
        document.getElementById('reNewPassword').value.length = 0;
        alert('New Passwords Did Not Match');
        return;
    }
    
    const body = {password: newPassword};
    updateUser(body);
}

bioForm.addEventListener('submit', bioFormHandler);
usernameForm.addEventListener('submit', usernameFormHandler);
passwordForm.addEventListener('submit', passwordFormHandler);