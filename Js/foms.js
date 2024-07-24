
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // formulario de login
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log("loginForm found");
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event captured for login");
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            console.log("Username:", username, "Password:", password);
            if (username === "" || password === "") {
                alert("Para ingresar llena todos los campos porfavor.");
            } else {
                alert("Inicio de sesión exitoso.");
                window.location.href = "/html/login.html"; 
            }
        });
    } else {
        console.error("loginForm not found");
    }

    //  formulario de registro
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        console.log("registerForm found");
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event captured for registration");
            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var name = document.getElementById('name').value;
            var password = document.getElementById('password').value;
            console.log("Username:", username, "Email:", email, "Name:", name, "Password:", password);
            if (username === "" || email === "" || name === "" || password === "") {
                alert("Para ingresar llena todos los campos porfavor.");
            } else {
                alert("Registro exitoso.");
                window.location.href = "/html/Form.html"; 
        }});
    } else {
        console.error("registerForm not found");
    }
});
