const logInForm = document.getElementById('logInForm')

const logInFormHandler = async (event) => {
    event.preventDefault();
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if(!(userName && password)) {
        alert('You must enter both a username and password')
        return;
    }

    const response = await fetch('/api/user/login', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName, password})
    })

    if(response.ok){
        location = ('/')
    } else{
        alert('Unable to log in')
    }
}

logInForm.addEventListener('submit', logInFormHandler)

