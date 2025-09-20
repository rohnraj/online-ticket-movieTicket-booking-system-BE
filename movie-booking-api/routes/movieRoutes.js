import express from "express";
const router = express.Router();

router.post('/addmovie', addNewMovieController);
router.get('/movies', getAllMoviesController);
router.get('/movie/:id', getMovieByIdController);
router.put('/movie/:id', updateMovieController);
router.delete('/movie/:id', deleteMovieController);
router.post('/addthreater', addTheaterController);
router.get('/theaters', getAllTheatersController);
router.get('/theater/:id', getTheaterByIdController);

export default router;