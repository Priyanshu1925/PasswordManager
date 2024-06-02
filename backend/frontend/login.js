// Send data to backend using fetch

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = { username, password };

    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed!');
        }
        return response.text();
    })
    .then(data => {
        alert("Login successful!");
        window.location.href = "/home.html";
    })
    .catch(error => {
        alert("Login failed! Please check your credentials and try again.");
        console.error('Login error:', error);
    });
});
