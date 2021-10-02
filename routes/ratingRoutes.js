const { request } = require('express');
const express = require('express')
const router = express.Router()
const review = require('../controllers/reviewsControllers');
// const author = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');


router.get('/', review.getAllReview);
router.get('/:id', review.getOneReview);
router.get('/movies/:id', review.getAllReviewByMovie)
router.post('/:id', auth, review.postReview);
router.delete('/delete/:id', auth, review.deleteReview);
router.put('/update/:id', auth, review.updateReview);

module.exports = router