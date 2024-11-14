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
 * Component for displaying and interacting with a chat related to an incidence.
 * Allows users to view chat messages and send new ones.
 */
const IncidenceChatComponent: React.FC<IncidenceChatProps> = ({
  data,
  completed,
  error,
  handleSendMessage,
}) => {
  /** Retrieves the current authenticated user */
  const { user } = useAuth();

  /** State to store chat messages */
  const [messages, setMessages] = useState<IncidenceMessage[]>([]);
  /** State for the current message input by the user */
  const [newMessage, setNewMessage] = useState<string>("");

  /** Reference to the chat end div to scroll into view when new messages arrive */
  const chatEndRef = useRef<HTMLDivElement>(null);

  /**
   * Listens for new messages being added via the event emitter and updates the chat.
   */
  useEffect(() => {
    const handleMessageAdded = (eventPayload: IncidenceMessage) => {
      setMessages((prevMessages) => [...prevMessages, eventPayload]);
    };

    eventEmitter.on("messageAdded", handleMessageAdded);

    /** Cleanup listener on component unmount */
    return () => {
      eventEmitter.removeListener("messageAdded", handleMessageAdded);
    };
  }, []);

  /**
   * Updates the messages state when the data prop changes and the request is completed.
   */
  useEffect(() => {
    if (completed && !error) {
      setMessages(data!);
    }
  }, [completed, error, data]);

  /**
   * Scrolls to the bottom of the chat when new messages are added.
   */
  useEffect(() => {
    const chatContainer = chatEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  /**
   * Handles sending a new message when the send button is clicked.
   * Clears the input field after sending.
   */
  const handleSendClick = () => {
    if (newMessage.trim()) {
      handleSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  /**
   * Handles sending a message when the Enter key is pressed.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  /**
   * Renders the chat messages and input field for sending new messages.
   */
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
                  ? "ms-auto your-chat-message"
                  : "chat-message"
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
        {/* Input for new message and send button */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn button-main-dark" onClick={handleSendClick}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceChatComponent;
