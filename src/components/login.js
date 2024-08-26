import React, { useState } from 'react';
import './login.css';
import { useAuth } from '../context/AuthContext';  // Importamos el contexto de autenticación
import { FaUser, FaLock } from 'react-icons/fa';  // Iconos
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';  // Para obtener el rol desde Firestore
import { auth ,db } from '../firebaseConfig';  // Configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';  // Importa la función específica de autenticación
import {  collection, query, where, getDocs } from 'firebase/firestore';


const Login = () => {
    const { setUser } = useAuth();  // Obtenemos el método para actualizar el estado del usuario
    const [identifier, setIdentifier] = useState('');  // Estado para almacenar el email
    const [password, setPassword] = useState('');  // Estado para almacenar la contraseña
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
      try {
        // Autenticación de Firebase
        let userCredential;
        const usersRef = collection(db, 'users');
        const userQuery = query(usersRef, where('email', '==', identifier));
    
        let userSnapshot = await getDocs(userQuery);
        if (userSnapshot.empty) {
          const usernameQuery = query(usersRef, where('username', '==', identifier));
          userSnapshot = await getDocs(usernameQuery);
        }
    
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          userCredential = await signInWithEmailAndPassword(auth, userData.correo, password);
        } else {
          throw new Error('Usuario no encontrado');
        }
    
        // Obtener información adicional del usuario desde Firestore
        const user = userCredential.user;
        const userDoc = await getDoc(userSnapshot.docs[0].ref);
    
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), email: user.email });
          if (userDoc.data().role === 'administrador') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          alert('No se encontraron datos para este usuario.');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el inicio de sesión: ' + error.message);
      }
    };
    
    return (
      <div className="fondo-wrapper">
        <div className="fondo">
          <div className='contenedor-form login'>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <h2>Iniciar sesión</h2>
              <div className="contenedor-input">
              <input 
                type="text" 
                placeholder='Correo o Username' 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                required 
              />
                <FaUser className='icono' />
              </div>
              <div className="contenedor-input">
                <input 
                  type="password" 
                  placeholder='Contraseña' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <FaLock className='icono' />
              </div>
              <div className="recordar">
                <label><input type="checkbox" /> Recordar sesión</label>
              </div>
              <button type="submit" className="btn">Iniciar sesión</button>
              <div className="registro-link">
                <p className='notiene'>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;
