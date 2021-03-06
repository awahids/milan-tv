const express = require('express')
const router = express.Router()
const artistRouter = require('./artist.routes')
const watchlistRouter = require('./watchlists.routes')
const usersRouter = require('./usersRoute')
const adminRouter = require('./adminRoute')
const moviesRouter = require('./moviesRoute')
const genresRouter = require('./genre')
const tagsRouter = require('./tags')
const moviesGenres = require('./moviesGenres')
const moviesTags = require('./moviesTags')
const rating = require('./ratingRoutes');
const moviesCast = require('./movieCast')

router.use('/v1/artists', artistRouter)
router.use('/v1/watchlist', watchlistRouter)
router.use('/v1/users', usersRouter)
router.use('/v1/admin', adminRouter)
router.use('/v1/movies', moviesRouter)
router.use('/v1/genres', genresRouter)
router.use('/v1/tags', tagsRouter)
router.use('/v1/moviesgenres', moviesGenres)
router.use('/v1/moviestags', moviesTags)
router.use('/v1/review', rating)
router.use('/v1/moviescast', moviesCast)

module.exports = router
