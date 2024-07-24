document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");



    
    // Formulario de login
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log("loginForm found");
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event captured for login");
            var username = document.getElementById('username');
            var password = document.getElementById('password');
            if (username && password) {
                console.log("Username:", username.value, "Password:", password.value);
                if (username.value === "" || password.value === "") {
                    alert("Para ingresar llena todos los campos por favor.");
                } else {
                    alert("Inicio de sesión exitoso.");
                    window.location.href = "login.html"; // Ajusta esta ruta si es necesario
                }
            } else {
                console.error("Username or Password input elements not found");
            }
        });
    } else {
        console.error("loginForm not found");
    }

    // Formulario de registro
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        console.log("registerForm found");
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event captured for registration");
            var username = document.getElementById('username');
            var email = document.getElementById('email');
            var name = document.getElementById('name');
            var password = document.getElementById('password');
            if (username && email && name && password) {
                console.log("Username:", username.value, "Email:", email.value, "Name:", name.value, "Password:", password.value);
                if (username.value === "" || email.value === "" || name.value === "" || password.value === "") {
                    alert("Para ingresar llena todos los campos por favor.");
                } else {
                    alert("Registro exitoso.");
                    window.location.href = "/html/login.html"; // Ajusta esta ruta si es necesario
                }
            } else {
                console.error("One or more input elements not found");
            }
        });
    } else {
        console.error("registerForm not found");
    }
});

