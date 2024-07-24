const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());

// Ruta API para registrar usuarios
app.post('/api/register', (req, res) => {
    const { username, email, name, password } = req.body;
    fs.readFile(path.join(__dirname, 'base.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error leyendo los datos' });
        } else {
            let users = JSON.parse(data);
            users.push({ username, email, name, password });
            fs.writeFile(path.join(__dirname, 'base.json'), JSON.stringify(users), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error guardando los datos' });
                } else {
                    res.status(200).json({ message: 'Se registro correctamente' });
                }
            });
        }
    });
});

// Ruta API para validar inicio de sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(path.join(__dirname, 'base.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error leyendo los datos' });
        } else {
            let users = JSON.parse(data);
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                res.status(200).json({ message: 'Ingresa correctamente' });
            } else {
                res.status(401).json({ error: 'Credenciales invalidas' });
            }
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
