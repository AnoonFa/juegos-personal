import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './GameReviews.css';
import { useAuth } from '../../context/AuthContext';

const GameReviews = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('gameId', '==', gameId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    });
    return () => unsubscribe();
  }, [gameId]);

  // Función para verificar si el usuario posee el juego
  const userOwnsGame = user?.gamesOwned && user.gamesOwned[gameId];

  // Función para manejar el envío de la reseña
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (userOwnsGame) {
      try {
        await addDoc(collection(db, 'reviews'), {
          gameId,
          username: user.username,
          comment: newReview,
          rating: rating,
          userId: user.uid, // Guardar el ID del usuario para validar en Firestore
          createdAt: new Date(),
        });
        setNewReview('');
        setRating(1);
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
      }
    } else {
      alert('Debes poseer el juego para dejar una reseña.');
    }
  };

  return (
    <div className="game-reviews">
      <h3>Reseñas de Juegos</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className="review">
            <h4>{review.username}</h4>
            <p>{review.comment}</p>
            <p>Puntuación: {review.rating}/5</p>
          </div>
        ))
      ) : (
        <p>No hay reseñas disponibles.</p>
      )}

      {userOwnsGame && (
        <form onSubmit={handleReviewSubmit} className="review-form">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Escribe tu reseña..."
            required
          />
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button type="submit">Enviar Reseña</button>
        </form>
      )}
    </div>
  );
};

export default GameReviews;