// Function to mask the password
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Function to copy text to clipboard
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

// Function to delete a password entry
const deletePassword = (website, username) => {
    fetch("/data/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ website, username })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            showPasswords();
        }
    })
    .catch(error => {
        console.error('Error deleting password:', error);
        alert("Error deleting password. Please try again later.");
    });
};

// logout functionality with onClick
const logout = () => {
    fetch("/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
            window.location.href = "/index.html";
        })
        .catch(error => {
            console.error('Error logging out:', error);
            alert("Error logging out. Please try again later.");
        });
};




// Function to display passwords in the table
// Function to display passwords in the table
const showPasswords = () => {
    fetch("/data/all")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let tb = document.querySelector("table");
        if (data.length === 0) {
            tb.innerHTML = "No Data To Show";
        } else {
            tb.innerHTML = `<tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;
            let str = "";
            data.forEach(element => {
                str += `<tr>
                    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td><button class="btnsm" onclick="deletePassword('${element.website}', '${element.username}')">Delete</button></td>
                </tr>`;
            });
            tb.innerHTML += str;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert("Error fetching data");
    });

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};


// Initialize and display passwords on page load
document.addEventListener("DOMContentLoaded", showPasswords);

// Event listener for the form submission
document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (website === "" || username === "" || password === "") {
        alert("Fill all the fields");
        return;
    }
    const data = { website, username, password };
    fetch("/data/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            showPasswords();
        }
    })
    .catch(error => {
        console.error('Error saving password:', error);
        alert("Something went wrong");
    });
});
