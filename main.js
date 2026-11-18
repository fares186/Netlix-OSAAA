// =====================================
// FARES SAAD - MAIN JAVASCRIPT
// =====================================


// =====================================
// EMAIL GET STARTED FORMS
// =====================================

function handleEmailForm(formId, inputId) {
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(inputId);

    if (!form || !emailInput) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        if (!emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            return;
        }

        // Save email temporarily for the registration page
        sessionStorage.setItem("userEmail", email);

        // Go to registration page
        window.location.href = "register.html";
    });
}

handleEmailForm("startForm", "startEmail");
handleEmailForm("bottomForm", "bottomEmail");


// =====================================
// REGISTER PAGE
// =====================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    // Fill email if user came from the home page
    const savedEmail = sessionStorage.getItem("userEmail");
    const emailField = document.getElementById("email");

    if (savedEmail && emailField) {
        emailField.value = savedEmail;
    }

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;
        const message = document.getElementById("registerMessage");

        // Check empty fields
        if (!fullName || !email || !password || !confirmPassword) {
            message.textContent = "Please fill in all fields.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Check password length
        if (password.length < 6) {
            message.textContent = "Password must be at least 6 characters.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Check terms
        if (!terms) {
            message.textContent = "Please accept the Terms and Conditions.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Get existing users
        let users = JSON.parse(localStorage.getItem("marwanUsers")) || [];

        // Check if email already exists
        const existingUser = users.find(function (user) {
            return user.email.toLowerCase() === email.toLowerCase();
        });

        if (existingUser) {
            message.textContent = "This email is already registered.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Create new user
        const newUser = {
            fullName: fullName,
            email: email,
            password: password
        };

        users.push(newUser);

        // Save users in browser
        localStorage.setItem("marwanUsers", JSON.stringify(users));

        message.textContent = "Account created successfully!";
        message.style.color = "#4caf50";

        // Clear saved email
        sessionStorage.removeItem("userEmail");

        // Redirect to login page
        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);

    });
}


// =====================================
// LOGIN PAGE
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        if (!email || !password) {
            message.textContent = "Please enter your email and password.";
            message.style.color = "#ff4d4d";
            return;
        }

        // Get registered users
        const users = JSON.parse(localStorage.getItem("marwanUsers")) || [];

        // Find matching user
        const foundUser = users.find(function (user) {
            return (
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
            );
        });

        if (foundUser) {

            message.textContent = "Login successful! Welcome " + foundUser.fullName;
            message.style.color = "#4caf50";

            localStorage.setItem("currentUser", JSON.stringify(foundUser));

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);

        } else {

            message.textContent = "Incorrect email or password.";
            message.style.color = "#ff4d4d";

        }

    });

}