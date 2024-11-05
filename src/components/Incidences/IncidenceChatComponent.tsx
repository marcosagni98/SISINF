import React, { useEffect, useState } from "react";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import { toLocalDate } from "../../utils/toLocalDate";

interface IncidenceChatProps {
  data: IncidenceMessage[] | null;
  completed: boolean;
  error: string | null;
  handleSendMessage: (message: string) => void;
}

const IncidenceChatComponent: React.FC<IncidenceChatProps> = ({
  data,
  completed,
  error,
  handleSendMessage,
}) => {
  const [messages, setMessages] = useState<IncidenceMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (completed && !error) {
      setMessages(data!);
    }
  }, [completed, error, data]);

  const handleSendClick = () => {
    if (newMessage.trim()) {
      handleSendMessage(newMessage.trim());
      setNewMessage(""); // Limpiar el campo de mensaje después de enviarlo
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Conversación de la incidencia</h5>
        <div
          className="chat-window mb-3"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender}</strong>{" "}
              <small className="text-muted">{toLocalDate(msg.sentAt)}</small>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-dark" onClick={handleSendClick}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceChatComponent;
