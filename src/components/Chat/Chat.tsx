import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: '¡Hola! ¿Cómo estás?', sender: 'other' },
    { text: 'Bien, ¿y tú?', sender: 'me' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'me' }]);
      setInput('');
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card" style={{ height: '400px', overflowY: 'auto' }}>
        <div className="card-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${message.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-2 rounded ${
                  message.sender === 'me' ? 'bg-dark text-white' : 'bg-light'
                }`}
                style={{ maxWidth: '70%' }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-dark" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
