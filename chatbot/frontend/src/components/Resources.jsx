import React from 'react';
import { Wind, Moon, Brain, Activity } from 'lucide-react';

const RESOURCES = [
  {
    icon: <Wind size={24} />,
    title: "4-7-8 Breathing",
    desc: "Inhale for 4s, hold for 7s, exhale slowly for 8s. Repeat 4 times to calm your nervous system instantly."
  },
  {
    icon: <Brain size={24} />,
    title: "5-4-3-2-1 Grounding",
    desc: "Find 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
  },
  {
    icon: <Moon size={24} />,
    title: "Sleep Hygiene",
    desc: "Avoid screens 1 hour before bed. Keep your room dark and cool. Try reading a physical book to wind down."
  },
  {
    icon: <Activity size={24} />,
    title: "Stress Management",
    desc: "Break large tasks into tiny steps. It's okay to take breaks. Remember, your worth is not tied to productivity."
  }
];

const Resources = () => {
  return (
    <div className="resources-page">
      <h2 className="mood-title" style={{ fontSize: '1.75rem', textAlign: 'left' }}>Wellness Toolkit</h2>
      <p className="mood-subtitle" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        Quick techniques to help you restore balance and peace.
      </p>
      
      <div className="resources-grid">
        {RESOURCES.map((resource, i) => (
          <div key={i} className="resource-card glass-card">
            <div className="resource-icon">
              {resource.icon}
            </div>
            <h3 className="resource-title">{resource.title}</h3>
            <p className="resource-desc">{resource.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
