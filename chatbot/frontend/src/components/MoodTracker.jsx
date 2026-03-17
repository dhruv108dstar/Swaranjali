import React from 'react';

const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'neutral', emoji: '😐', label: 'Okay' },
  { id: 'stressed', emoji: '😰', label: 'Stressed' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'anxious', emoji: '🌀', label: 'Anxious' },
  { id: 'exhausted', emoji: '😫', label: 'Exhausted' }
];

const MoodTracker = ({ onSelect }) => {
  return (
    <div className="mood-page">
      <h2 className="mood-title">How are you feeling right now?</h2>
      <p className="mood-subtitle">Take a moment to check in with yourself. It's safe here.</p>
      
      <div className="mood-grid">
        {MOODS.map(mood => (
          <button 
            key={mood.id} 
            className="mood-btn"
            onClick={() => onSelect(mood.label.toLowerCase())}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
