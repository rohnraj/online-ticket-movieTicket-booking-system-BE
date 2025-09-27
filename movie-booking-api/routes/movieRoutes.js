import express from "express";
const router = express.Router();
import { 
    addNewMovieController, 
    getAllMoviesController, 
    getMovieByIdController,
    updateMovieController,
    deleteMovieController,
    addTheaterController,
    getAllTheatersController,
    getTheaterByIdController,
    updateTheaterController,
    deleteTheaterController
} from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post('/addmovie', authMiddleware, addNewMovieController);
router.get('/movies', authMiddleware, getAllMoviesController);
router.get('/movies/:id', authMiddleware, getMovieByIdController);
router.put('/movies/:id', authMiddleware, updateMovieController);
router.delete('/movies/:id', authMiddleware, deleteMovieController);
router.post('/addthreater', authMiddleware, addTheaterController);
router.get('/theaters', authMiddleware, getAllTheatersController);
router.get('/theater/:id', authMiddleware, getTheaterByIdController);
router.put('/theater/:id', authMiddleware, updateTheaterController);
router.delete('/theater/:id', authMiddleware, deleteTheaterController);

export default router;