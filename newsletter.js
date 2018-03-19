var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

/**
* @param context {WebtaskContext}
*  
*  Display HTML resource stored on cloudinary
* 
* Example:
* https://evino.cloudinary.auth0-extend.com/Newsletter/2018/03_marco/2018_03_19_likitacao/index.html
* 
* Params:
* .../Newsletter/<path-to-newsletter-resource>
*/

app.use(bodyParser.json());

app.get('/?*:resourcepath', function (req, res) {
  var newsletter = req.resourcepath ||  '2018/03_marco/2018_03_19_likitacao/index.html' ;  // show example if not provided.
  var url = 'https://res.cloudinary.com/evino/raw/upload/v1521468541/Newsletter/' + newsletter;
      res.writeHead(200, { 'Content-Type': 'text/html '});
      request(url).pipe(res);
});

module.exports = Webtask.fromExpress(app);

