const router = require('express').Router();
const MoviesTagsControllers = require ('../controllers/moviesTagsControllers.js');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create',  MoviesTagsControllers.create);
router.get('/moviesbytag', MoviesTagsControllers.getAllMoviesByTags);
router.get('/moviebytagid', MoviesTagsControllers.getMovieByTagId);
router.get('/datatagmovie', MoviesTagsControllers.getTagsByMovie)
router.put('/update/:id',  MoviesTagsControllers.update);
router.delete('/delete/:id',  MoviesTagsControllers.delete);


module.exports = router;