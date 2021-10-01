const express = require('express')
const router = express.Router()
const movies = require('../controllers/moviesControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')
const uploadPoster = require('../middlewares/uploadPoster')

router.post("/post", auth, uploadPoster("poster"), author.authAdmin, movies.postMovie)  
router.get("/:id", movies.getOneMovie)
router.get("/all/:page", movies.getAllMovies)
// router.get("/allbygenre", movies.getAllMoviesByGenre)
router.put("/update/:id", auth, author.authAdmin, uploadPoster("poster"), movies.updateMovies)
router.delete("/delete/:id", auth, author.authAdmin, movies.deleteMovies)
router.get("/search/:keyword", movies.searchMovies)

module.exports = router