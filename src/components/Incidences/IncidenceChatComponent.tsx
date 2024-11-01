import React, { useState } from "react";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import * as signalR from "@microsoft/signalr";

const IncidenceChatComponent: React.FC = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<IncidenceMessage[]>([
    {
      sender: "Juan Pérez",
      message: "¿Alguna actualización sobre el problema?",
      sentAt: new Date("2023-10-01T10:00:00"),
    },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  /*
  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub") // URL de tu SignalR hub
      .withAutomaticReconnect()
      .build();

    connect.start().then(() => {
      console.log("Conectado a SignalR");

      // Unirse a un grupo específico basado en incidenceId
      connect.invoke("JoinGroup", `Incidence-${incidenceId}`);

      // Recibir mensajes
      connect.on("ReceiveMessage", (message: IncidenceMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    });

    setConnection(connect);

    return () => {
      if (connect) {
        connect.stop();
      }
    };
  }, [incidenceId]);
  
  const handleSendMessage = async () => {
    if (connection && newMessage.trim() !== "") {
      const message: IncidenceMessage = {
        sender: "Usuario Actual", // Reemplaza con el nombre del usuario actual
        message: newMessage,
        sentAt: new Date(),
      };

      await connection.invoke("SendMessageToGroup", `Incidence-${incidenceId}`, message);
      setNewMessage("");
    }
  };
  */
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Conversación de la incidencia</h5>
        <div className="chat-window mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender}</strong> <small className="text-muted">{msg.sentAt.toLocaleTimeString()}</small>
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
          <button className="btn btn-dark">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceChatComponent;
