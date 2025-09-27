import pool_instance from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

export const addMovieModel = (movieData) => {
    try {

        const id = uuidv4();
        const query = `INSERT INTO movies (
        id, movie_title, language, genre, duration, release_date, end_date, rating, show_dates) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;

        const values = [
            id,
            movieData.movie_title,
            movieData.language,
            movieData.genre,
            movieData.duration,
            movieData.release_date,
            movieData.end_date,
            movieData.rating,
            movieData.show_dates
        ];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
}

export const getAllMoviesModel = () => {
    try {
        const query = "SELECT * FROM movies";
        return pool_instance.query(query);
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

export const getMovieByID = (id) => {
    try {
        const query = "SELECT * FROM movies WHERE id = $1";
        const values = [id];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        throw error;
    }
}

// study this function 
export const updateMovieModel = (id, updateData) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        for (const key in updateData) {

            if(updateData[key] !== undefined) {

                fields.push(`${key} = $${index}`);
                values.push(updateData[key]);
                index++;
            }
        }
        values.push(id);

        const query = `UPDATE movies SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
}

export const deleteMovieByID = (id) => {
    try {
        const query = "DELETE FROM movies WHERE id = $1 RETURNING *";
        const values = [id];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
}

export const addTheaterModel = (theaterData) => {
    try {
        const id = uuidv4();
        const query = "INSERT INTO theaters (id, theater_name, location, total_seats) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [
            id,
            theaterData.theater_name,
            theaterData.location,
            theaterData.total_seats
        ];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error adding theater:", error);
        throw error;
    }
}

export const getAllTheatersModel = () => {
    try {
        const query = "SELECT * FROM theaters";
        return pool_instance.query(query);
    } catch (error) {
        console.error("Error fetching theaters:", error);
        throw error;
    }
}

export const getTheaterByID = (id) => {
    try {
        const query = "SELECT * FROM theaters WHERE id = $1";
        const values = [id];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error fetching theater by ID:", error);
        throw error;
    }
}

export const updateTheaterModel = (id, updateData) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        for (const key in updateData) {

            if(updateData[key] !== undefined) {

                fields.push(`${key} = $${index}`);
                values.push(updateData[key]);
                index++;
            }
        }
        values.push(id);

        const query = `UPDATE theaters SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error updating theater:", error);
        throw error;
    }
}

export const deleteTheaterByID = (id) => {
    try {
        console.log("id", id)
        const query = "DELETE FROM theaters WHERE id = $1 RETURNING *";
        const values = [id];
        return pool_instance.query(query, values);
    } catch (error) {
        console.error("Error deleting theater:", error);
        throw error;
    }
}