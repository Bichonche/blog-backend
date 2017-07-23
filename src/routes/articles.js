const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles')

/* GET users listing. */
router.get('/', function(req, res, next) {
    articlesController.getAllArticles(req, res, next)
});

router.post('/', (req, res, next) => {
   articlesController.createArticle(req, res, next)
});

router.get('/:id', (req, res, next) => {
    articlesController.getArticleById(req, res, next)
})

module.exports = router;
