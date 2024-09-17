import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaAddressCard } from 'react-icons/fa';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Implementación de debounce para validaciones
  let timeoutId;

  const debounceCheck = (callback, delay) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, delay);
  };

  // Verifica si el nombre de usuario ya está en uso
  const checkUsernameExists = async (username) => {
    if (username.trim() === '') return;
    const response = await axios.get(`http://localhost:3000/users?username=${username}`);
    setUserExists(response.data.length > 0);
  };

  // Verifica si el correo ya está en uso
  const checkEmailExists = async (email) => {
    if (email.trim() === '') return;
    const response = await axios.get(`http://localhost:3000/users?correo=${email}`);
    setEmailExists(response.data.length > 0);
  };

  // Valida la contraseña
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  // Verificación de la contraseña con mensaje de error específico
  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.'
      );
    } else {
      setPasswordError('');
    }
  }, [password]);

  // Maneja el registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setAlertMessage('La contraseña no cumple con los requisitos.');
      setAlertType('error');
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden.');
      setAlertType('error');
      return;
    }

    if (userExists || emailExists) {
      setAlertMessage('El nombre de usuario o correo ya está en uso.');
      setAlertType('error');
      return;
    }

    try {
      const newUser = { username, correo: email, contrasena: password, nombre: name, telefono: phone };
      await axios.post('http://localhost:3000/users', newUser);
      setAlertMessage('Registro exitoso');
      setAlertType('success');

      // Limpiar el formulario tras el registro exitoso
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error al registrar:', error);
      setAlertMessage('Error al registrar. Por favor, inténtalo de nuevo.');
      setAlertType('error');
    }
  };

  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form register">
          {/* Alerta general */}
          {alertMessage && (
            <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
              <Alert severity={alertType} onClose={() => setAlertMessage('')}>
                {alertMessage}
              </Alert>
            </Stack>
          )}

          <form onSubmit={handleRegister}>
            <h2>Registrarse</h2>

            {/* Campo de nombre completo */}
            <div className="contenedor-input">
              <input
                type="text"
                placeholder="Nombre Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaAddressCard className="icono" />
            </div>

            {/* Campo de teléfono */}
            <div className="contenedor-input">
              <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhone className="icono" />
            </div>

            {/* Campo de nombre de usuario */}
            <div className="contenedor-input">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  debounceCheck(() => checkUsernameExists(e.target.value), 500);
                }}
                required
              />
              <FaUser className="icono" />
              {userExists && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  El nombre de usuario ya está en uso.
                </Alert>
              )}
            </div>

            {/* Campo de correo */}
            <div className="contenedor-input">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  debounceCheck(() => checkEmailExists(e.target.value), 500);
                }}
                required
              />
              <FaEnvelope className="icono" />
              {emailExists && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  El correo ya está en uso.
                </Alert>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="contenedor-input">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icono" />
              {passwordError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {passwordError}
                </Alert>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="contenedor-input">
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="icono" />
            </div>

            <button type="submit" className="btn">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
