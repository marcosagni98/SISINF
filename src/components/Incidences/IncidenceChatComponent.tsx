import React, { useState } from "react";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import * as signalR from "@microsoft/signalr";

const IncidenceChatComponent: React.FC = () => {
  return (<></>/*
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
    </div>*/
  );
};

export default IncidenceChatComponent;
