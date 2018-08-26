const express = require('express'),
      config  = require('config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = [
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
    {
      img: 'https://via.placeholder.com/200x100',
      title: 'title',
      description: ''
    },
  ];

  res.render('index', { app: config.app, data: data });
});

module.exports = router;
