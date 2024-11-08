/**
 * Interface representing a dictionary with string keys and values of a generic type
 * @interface Dictionary
 * @template T - The type of the values stored in the dictionary
 * @property {string} [key] - The key of the dictionary item, which is a string
 * @property {T} [key] - The value associated with the key, which can be of any type specified by the generic T
 */

export interface Dictionary<T> {
    [key: string]: T;
}