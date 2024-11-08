/**
 * Interface representing a message related to an incidence
 * @interface IncidenceMessage
 * @property {number} senderId - The identifier of the user who sent the message
 * @property {number} incidentId - The unique identifier of the related incidence
 * @property {string} senderName - The name of the user who sent the message
 * @property {string} text - The content of the message
 * @property {string} sentAt - The date and time when the message was sent, in ISO format
 */

export interface IncidenceMessage {
    senderId: number;
    incidentId: number;
    senderName: string;
    text: string;
    sentAt: string;
}