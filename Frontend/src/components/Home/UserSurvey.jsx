import React, { useState } from 'react';
import '../../styles/UserSurvey.css';

const UserSurvey = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="user-survey">
            <h3>Encuesta de Satisfacción</h3>
            <div className="rating">
                <label>
                    Calificación:
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="0">Seleccione</option>
                        <option value="1">1 - Muy insatisfecho</option>
                        <option value="2">2 - Insatisfecho</option>
                        <option value="3">3 - Neutral</option>
                        <option value="4">4 - Satisfecho</option>
                        <option value="5">5 - Muy satisfecho</option>
                    </select>
                </label>
            </div>
            <div className="comment">
                <label>
                    Comentario:
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default UserSurvey;