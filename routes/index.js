const express = require('express'),
      request = require('request'),
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
  ];

  res.render('index', { app: config.app, data: data });
});

router.get('/api', (req, res, next) => {
  var uri = `https://www.googleapis.com/customsearch/v1?key=${config.app.google}&cx=010037545872869461834:5hokjb3sgyo&q=空`,
      data = [];
  request(uri, (error, response, body) => {
    // console.log(body);
    var items = JSON.parse(body).items;
    // console.log(items);
    for(let item of items) {
      // console.log(Object.keys(item));
      // console.log(typeof item.pagemap);
      // if((typeof item.pagemap) === 'undefined') console.log(item);
      var image = '';
      if(item.hasOwnProperty('pagemap')) image = item.pagemap.cse_image;
      // console.log(item.title, item.snippet, image);
      // console.log(result.cse_image);
      console.log(typeof image);
      data.push({
        img: image,
        title: item.title,
        description: item.snippet
      });
    }
    // console.log(data);
    // res.end('google api');
    res.render('index', { app: config.app, data: data });
  });
});

module.exports = router;
