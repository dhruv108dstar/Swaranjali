import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';
import { Heart, MessageCircle, BookOpen, AlertCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [mood, setMood] = useState(null);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setActiveTab('chat');
  };

  return (
    <div className="app-container">
      <header className="header glass">
        <div className="logo">
          <Heart size={28} color="var(--secondary)" fill="var(--secondary)" />
          <span>Sahara AI</span>
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
            style={{ border: 'none', background: 'transparent', fontSize: '1rem' }}
          >
            <MessageCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Chat
          </button>
          <button 
            className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
            style={{ border: 'none', background: 'transparent', fontSize: '1rem' }}
          >
            <BookOpen size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Resources
          </button>
        </nav>
      </header>

      <main className="glass chat-container" style={{ position: 'relative' }}>
        {activeTab === 'chat' && !mood && (
          <MoodTracker onSelect={handleMoodSelect} />
        )}
        
        {activeTab === 'chat' && mood && (
          <ChatInterface mood={mood} />
        )}

        {activeTab === 'resources' && (
          <Resources />
        )}
      </main>
      
      <div style={{ textAlign: 'center', marginTop: '-1rem' }}>
         <a href="tel:18005990019" className="btn-emergency">
           <AlertCircle size={20} /> Emergency Help (Kiran: 1800-599-0019)
         </a>
      </div>
    </div>
  );
}

export default App;
