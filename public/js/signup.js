const Signupform = document.getElementById('Signupform')

const Signupformhandler = async (event) => {
    event.preventDefault();
    const username = document.getElementById('Username').value.trim();
    const password = document.getElementById('Password').value.trim();

    if (!(username && password)) {
        alert('You must enter both a username and password')
        return;
    }
    const response = await fetch('/api/user/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (response.ok) {
        location = ('/')
    } else {
        const message = await response.json()
        alert('Unable to create user.\n Message: ' + message)
    }
}




Signupform.addEventListener('submit', Signupformhandler)


