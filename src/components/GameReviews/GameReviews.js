import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameReviews.css';
import { useAuth } from '../../context/AuthContext';

const GameReviews = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews?gameId=${gameId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [gameId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        const reviewData = {
          gameId,
          username: user.username,
          comment: newReview,
          rating: rating,
          userId: user.id, 
          createdAt: new Date().toISOString(),
        };

        await axios.post('http://localhost:3000/reviews', reviewData);
        setReviews([...reviews, reviewData]);
        setNewReview('');
        setRating(1);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      alert('Debes estar logueado para dejar una reseña.');
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

      {user && (
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
