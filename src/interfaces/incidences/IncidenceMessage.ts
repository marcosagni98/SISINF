/**
 * Interface representing a message sent regarding an incident.
 * 
 * @interface IncidenceMessage
 * @property {number} senderId - The ID of the user who sent the message.
 * @property {number} incidentId - The ID of the incident the message pertains to.
 * @property {string} senderName - The name of the user who sent the message.
 * @property {string} text - The content of the message.
 * @property {string} sentAt - The timestamp of when the message was sent.
 */
export interface IncidenceMessage {
    senderId: number;
    incidentId: number;
    senderName: string;
    text: string;
    sentAt: string;
}