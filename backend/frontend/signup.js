

// send ajax request to backend using fetch

document.getElementById("signupForm").addEventListener("submit", function() {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    console.log("details");

    if (!isStrongPassword(password)) {
        alert("Password must be strong");
        return;
    }
    const data = { username, email, password, confirmPassword };
    fetch("/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            alert("Signup successful!");
            window.location.href = "/";
        })
        .catch(error => {
            alert("Signup failed!");
        });
});


function isStrongPassword(password) {
    // Strong password validation with at least one capital letter, one digit, and one special character
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
}

// document.getElementById("signupForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     const data = { username, email, password, confirmPassword };
//     console.log("Here");
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:8000/users/signup");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 alert("Signup successful!");
//                 window.location.href = "login.html";
//             } else {
//                 alert("Signup failed!");
//             }
//         }
//     };
//     xhr.send(JSON.stringify(data));
// })