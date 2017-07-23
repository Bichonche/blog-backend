/**
 * Created by corentin on 09/07/17.
 */
const articlesModel = require("../../mongodb_models/articles");
class articlesController {
    getAllArticles(req, res, next) {
        articlesModel.find({})
            .populate('author')
            .then(users => {
            console.log(users)
            res.send(users)
        })
    }
    getArticleById(req, res, next) {
        articlesModel.findOne({id: req.params.id})
            .populate('author')
            .then(article => res.send(article))
    }
    createArticle(req, res, next) {
        articlesModel.create((req.body), (err, article) => {
            if(err)
                console.log(err)
            else
                res.send(article)
        });

    }

    deleteArticles(req, res, next) {
        articlesModel.remove({})
            .then()
    }
}

module.exports = new articlesController();