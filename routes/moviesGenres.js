const router = require('express').Router();
const MoviesGenresControllers = require ('../controllers/moviesGenresControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth,  MoviesGenresControllers.create);
router.get('/moviesbygenre', MoviesGenresControllers.getAllMoviesByGenre);
router.get('/moviesbygenre', MoviesGenresControllers.getMoviesByGenre);
router.put('/update/:id', auth,  MoviesGenresControllers.update);
router.delete('/delete/:id', auth,  MoviesGenresControllers.delete);


module.exports = router;