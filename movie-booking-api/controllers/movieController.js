import { 
    addMovieModel, 
    getAllMoviesModel, 
    getMovieByID, 
    updateMovieModel, 
    deleteMovieByID, 
    addTheaterModel,
    getAllTheatersModel,
    getTheaterByID,
    updateTheaterModel,
    deleteTheaterByID   
} from "../models/movieModel.js";
import jwt from "jsonwebtoken";

export const addNewMovieController = (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can add new movie" });
        }
        const {
            movie_title, 
            language, 
            genre, 
            duration, 
            release_date, 
            end_date, 
            rating, 
            show_dates
        } = req.body;
    
        if(!movie_title || !language ) {
            return res.status(400).json({ message: "movie_title and language is required plz provide them" });
        }
        const addedMovie = addMovieModel({
            movie_title, 
            language, genre, 
            duration, 
            release_date, 
            end_date, 
            rating, show_dates
        })

        res.status(201).json({ message: "Movie added successfully"});
    }catch(error){
        console.error("Error in addNewMovieController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllMoviesController = async (req, res) => {
    try{
        const movies = await getAllMoviesModel();
        res.status(200).json({ movies: movies.rows[0] });
    }catch(error){
        console.error("Error in getAllMoviesController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMovieByIdController = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const data = await getMovieByID(id)

        if(data.rows.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ movie: data.rows[0] });

    }catch(error){
        console.error("Error in getMovieByIdController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateMovieController = async (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can update movie" });
        }
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const {
            movie_title, 
            language, genre, 
            duration, 
            release_date, 
            end_date, 
            rating, show_dates
        } = req.body;
    
        const updatedMovie = await updateMovieModel(id, {
            movie_title, 
            language, genre, 
            duration, 
            release_date, 
            end_date, 
            rating, show_dates
        })

        if(updatedMovie.rows.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie.rows[0] });

    }catch(error){
        console.error("Error in updateMovieController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteMovieController = async (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can delete movie" });
        }
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const data = await deleteMovieByID(id)

        if(data.rows.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });

    }catch(error){
        console.error("Error in deleteMovieController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addTheaterController = async (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can add theater" });
        }
        const {
            theater_name,
            location,
            total_seats,
        } = req.body;

        if(!theater_name || !location) {
            return res.status(400).json({ message: "theater_name and location is required plz provide them" });
        }

        const data = await addTheaterModel({
            theater_name,
            location,
            total_seats
        })

        if(data.rows.length === 0) {
            return res.status(404).json({ message: "Theater not added" });
        }

        res.status(201).json({ message: "Theater added successfully"});
    }catch(error){
        console.error("Error in addTheaterController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllTheatersController = async (req, res) => {
    try{
        const theaters = await getAllTheatersModel();
        res.status(200).json({ theaters: theaters.rows });
    }catch(error){
        console.error("Error in getAllTheatersController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTheaterByIdController = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Theater ID is required" });
        }
        const data = await getTheaterByID(id)

        if(data.rows.length === 0) {
            return res.status(404).json({ message: "Theater not found" });
        }
        res.status(200).json({ theater: data.rows[0] });

    }catch(error){
        console.error("Error in getTheaterByIdController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTheaterController = async (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can update theater" });
        }
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Theater ID is required" });
        }
        const {
            theater_name,
            location,
            total_seats,
        } = req.body;
    
        const updatedTheater = await updateTheaterModel(id, {
            theater_name,
            location,
            total_seats
        })

        if(updatedTheater.rows.length === 0) {
            return res.status(404).json({ message: "Theater not found" });
        }
        res.status(200).json({ message: "Theater updated successfully", theater: updatedTheater.rows[0] });

    }catch(error){
        console.error("Error in updateTheaterController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteTheaterController = async (req, res) => {
    try{
        const decorded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        if(decorded.role !== "admin") {
            return res.status(403).json({ message: "Only admin can delete theater" });
        }
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "Theater ID is required" });
        }
        const data = await deleteTheaterByID(id)
        if(data.rows.length === 0) {
            return res.status(404).json({ message: "Theater not found" });
        }
        res.status(200).json({ message: "Theater deleted successfully" });

    }catch(error){
        console.error("Error in deleteTheaterController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
