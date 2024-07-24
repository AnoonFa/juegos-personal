document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Formulario de registro
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
            
            if (username === "" || email === "" || name === "" || password === "") {
                alert("Para ingresar llena todos los campos por favor.");
            } else {
                // Crear el objeto de datos para enviar a la API
                var userData = {
                    username: username,
                    email: email,
                    name: name,
                    password: password
                };

                // Enviar los datos al servidor
                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.message) {
                        alert(data.message);
                        window.location.href = "../html/login.html"; // Ajusta esta ruta si es necesario
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });
    } else {
        console.error("registerForm not found");
    }

    // Formulario de login
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log("loginForm found");
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event captured for login");
            
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            if (username === "" || password === "") {
                alert("Para ingresar llena todos los campos por favor.");
            } else {
                // Crear el objeto de datos para enviar a la API
                var loginData = {
                    username: username,
                    password: password
                };

                // Enviar los datos al servidor
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.message) {
                        alert(data.message);
                        window.location.href = "../html/index.html"; // Ajusta esta ruta si es necesario
                    } else if (data.error) {
                        alert(data.error);
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });
    } else {
        console.error("loginForm not found");
    }
});

