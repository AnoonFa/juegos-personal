import React, { useState } from 'react';
import './register.css';
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { auth ,createUserWithEmailAndPassword } from '../firebaseConfig';
import { setDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const RegisterForm = () => {
  //variables que pregunta en el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    username: '',
    contrasena: '',
  });

  //funcion que se ejecuta al presionar el boton registrar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //
  //funcion que se ejecuta al presionar el boton iniciar sesion
  
  const checkIfUserExists = async (email, username) => {
    // Consultamos a Firestore para verificar si el correo o el nombre de usuario ya están en uso.
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email));
    const usernameQuery = query(usersRef, where('username', '==', username));

    const emailSnapshot = await getDocs(emailQuery);
    const usernameSnapshot = await getDocs(usernameQuery);

    // Si el correo o el nombre de usuario ya están en uso, lanzamos una excepción.
    if (!emailSnapshot.empty || !usernameSnapshot.empty) {
      throw new Error('El correo o el nombre de usuario ya están en uso.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await checkIfUserExists(formData.correo, formData.username);

      const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.contrasena);
      const user = userCredential.user;

      const userData = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        correo: formData.correo,
        username: formData.username,
        role: 'cliente',
        membership: false,
        gamesOwned: {}
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      alert('Registro exitoso. Puedes iniciar sesión ahora.');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro: ' + error.message);
    }
  };

  

  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form">
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="contenedor-input">
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
              <FaUser className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
              <FaPhone className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
              <FaEnvelope className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
              <FaUser className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" required />
              <FaLock className='icono' />
            </div>
            <button type="submit" className="btn">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
