import React, { useState } from 'react';
import { Leaf } from 'lucide-react'; // Using a leaf icon for environmental theme

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chatbot Button */}
      <div
        className="chatbot-button"
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#2E7D32', // Dark green for eco-friendly theme
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        }}
      >
        <Leaf size={28} color="white" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '320px',
            height: '420px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 12px rgba(0, 0, 0, 0.3)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: '#2E7D32',
              color: 'white',
              padding: '10px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            🌿 Carbon Footprint Tracker
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
            }}
          >
            <p>Welcome! 🌱 How can I help you reduce your carbon footprint?</p>
          </div>

          {/* Chat Input */}
          <div style={{ display: 'flex', gap: '8px', padding: '10px' }}>
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
            <button
              style={{
                padding: '10px 16px',
                backgroundColor: '#2E7D32',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
