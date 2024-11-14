import { EventEmitter } from 'events';

/**
 * Singleton instance of EventEmitter for handling custom events across the application.
 * Provides a centralized way to emit and listen to events between components.
 */
const eventEmitter = new EventEmitter();

export default eventEmitter;
