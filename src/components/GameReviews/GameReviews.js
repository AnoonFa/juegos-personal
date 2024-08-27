import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameReviews.css';
import { useAuth } from '../../context/AuthContext';

const GameReviews = ({ gameId, mode = 'all' }) => {
  const [reviews, setReviews] = useState([]);
  const [gameName, setGameName] = useState('');
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const { user } = useAuth();
  const [visibleReviews, setVisibleReviews] = useState(3); // Mostrar solo 3 reseñas inicialmente

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await axios.get(`http://localhost:3000/games/${gameId}`);
        setGameName(gameResponse.data.name);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        let reviewsResponse;
        if (mode === 'user' && user) {
          reviewsResponse = await axios.get(`http://localhost:3000/reviews?gameId=${gameId}&sellerId=${user.id}`);
        } else {
          reviewsResponse = await axios.get(`http://localhost:3000/reviews?gameId=${gameId}`);
        }
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchGameDetails();
    fetchReviews();
  }, [gameId, mode, user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        const reviewData = {
          gameId,
          username: user.username,
          comment: newReview,
          rating,
          userId: user.id,
          createdAt: new Date().toISOString(),
        };

        await axios.post('http://localhost:3000/reviews', reviewData);
        setReviews([...reviews, { ...reviewData, id: reviews.length + 1 }]);
        setNewReview('');
        setRating(1);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      alert('Debes estar logueado para dejar una reseña.');
    }
  };

  const showMoreReviews = () => {
    setVisibleReviews(prev => prev + 3); // Mostrar 3 reseñas más al hacer clic en el botón
  };

  return (
    <div className="game-reviews">
      <h3>Reseñas de {gameName}</h3>
      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={review.id || index} className="review">
              <h4>{review.username}</h4>
              <p>{review.comment}</p>
              <p>Puntuación: {review.rating}/5</p>
            </div>
          ))}
          {visibleReviews < reviews.length && (
            <button onClick={showMoreReviews}>Mostrar más</button>
          )}
        </>
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
