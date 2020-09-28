var express = require('express');
var router = express.Router();

const ARTICLES = [{
    title: 'Article Title',
    createdAt: new Date(),
    description: 'Article description'
},{
    title: 'Article Title',
    createdAt: new Date(),
    description: 'Article description'
}]

/* GET articles page. */
router.get('/', function(req, res, next) {
  res.render('articles/index', {articles: ARTICLES});
});

module.exports = {
  name: '/articles',
  router: router
}