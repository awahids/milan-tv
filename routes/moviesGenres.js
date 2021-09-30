const router = require('express').Router();
const MoviesGenresControllers = require ('../controllers/moviesGenresControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create',  MoviesGenresControllers.create);
router.get('/moviesbygenre', MoviesGenresControllers.getAllMoviesByGenres);
router.get('/moviebygenreid', MoviesGenresControllers.getMovieByGenreId);
router.get('/datagenremovie', MoviesGenresControllers.getGenresByMovie)
router.put('/update/:id',  MoviesGenresControllers.update);
router.delete('/delete/:id',  MoviesGenresControllers.delete);


module.exports = router;