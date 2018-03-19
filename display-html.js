/**
* @param context {WebtaskContext}
*  
*  Display HTML resource stored on cloudinary
* 
* Example:
* https://evangelism.cloudinary.auth0-extend.com/display-html?newsletter=2018/03_marco/2018_03_19_likitacao/index.html
* 
* ?newsletter=<path-to-newsletter-resource>
*/


const request = require('request');

module.exports = function (context, req, res) {
  var newsletter = context.data.newsletter ||  'Newsletter/2018/03_marco/2018_03_19_likitacao/index.html' ; 
  var url = 'https://res.cloudinary.com/evino/raw/upload/v1521468541/Newsletter/' + newsletter;
      res.writeHead(200, { 'Content-Type': 'text/html '});
       request(url).pipe(res);
};

