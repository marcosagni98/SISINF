import React, { useEffect, useRef, useState } from "react";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import { toLocalDate } from "../../utils/toLocalDate";
import eventEmitter from "../../utils/eventEmitter";
import { useAuth } from "../../hooks/useAuth";

interface IncidenceChatProps {
  data: IncidenceMessage[] | null;
  completed: boolean;
  error: string | null;
  handleSendMessage: (message: string) => void;
}

/**
 * IncidenceChatComponent
 *
 * This component displays and manages a chat interface for an incidence,
 * allowing users to view messages and send new ones in real-time.
 *
 * @param {IncidenceChatProps} props - Contains chat data, status flags, and a message handler
 * @returns {React.ReactElement} - A real-time chat component
 */
const IncidenceChatComponent: React.FC<IncidenceChatProps> = ({
  data,
  completed,
  error,
  handleSendMessage,
}) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<IncidenceMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

   /**
   * Real-time Event Handling: Subscribes to message updates.
   * When a new message event is triggered, it appends the message to the chat.
   */
  useEffect(() => {
    const handleMessageAdded = (eventPayload: IncidenceMessage) => {
      console.log(eventPayload);
      setMessages((prevMessages) => [...prevMessages, eventPayload]);
    };

    eventEmitter.on("messageAdded", handleMessageAdded);

    return () => {
      eventEmitter.removeListener("messageAdded", handleMessageAdded);
    };
  }, []);

  /**
   * Initializes messages once data is fully loaded.
   * Ensures that messages are only set if data load is complete and there is no error.
   */
  useEffect(() => {
    if (completed && !error) {
      setMessages(data!);
    }
  }, [completed, error, data]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendClick = () => {
    if (newMessage.trim()) {
      handleSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Conversación de la incidencia</h5>
        <div
          className="chat d-flex flex-column mb-3"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded ${
                user && user.id === msg.senderId
                  ? "ms-auto bg-light"
                  : "bg-dark text-white"
              }`}
              style={{ width: "fit-content" }}
            >
              <strong>{msg.senderName}</strong>{" "}
              <small>{toLocalDate(msg.sentAt)}</small>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
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
