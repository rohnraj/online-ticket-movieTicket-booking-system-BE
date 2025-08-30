import pool_instance from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

export function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    return pool_instance.query(query, values);
}
export function createUser(username, password, gender, phoneNumber, email) {

    const id = uuidv4();
    const query = 'INSERT INTO users (id, username, password, gender, phoneNumber, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [id, username, password, gender, phoneNumber, email];
    return pool_instance.query(query, values);
}