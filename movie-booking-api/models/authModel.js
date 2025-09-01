import pool_instance from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

export function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    return pool_instance.query(query, values);
}
export function getUserByID(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    return pool_instance.query(query, values);
}
export function createUser(username, password, gender, phoneNumber, email) {

    const id = uuidv4();
    const query = 'INSERT INTO users (id, username, password, gender, phoneNumber, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [id, username, password, gender, phoneNumber, email];
    return pool_instance.query(query, values);
}
export function updateNewPassword(id, newPassword) {

    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';
    const values = [newPassword, id];
    return pool_instance.query(query, values);
}
export function updateUsername(id, username) {

    const query = 'UPDATE users SET username = $1 WHERE id = $2 RETURNING *';
    const values = [username, id];
    return pool_instance.query(query, values);
}
export function updatePhoneNumber(id, phoneNumber) {

    const query = 'UPDATE users SET phoneNumber = $1 WHERE id = $2 RETURNING *';
    const values = [phoneNumber, id];
    return pool_instance.query(query, values);
}
export function updateEmail(id, email) {

    const query = 'UPDATE users SET email = $1 WHERE id = $2 RETURNING *';
    const values = [email, id];
    return pool_instance.query(query, values);
}