/**
* @param context {WebtaskContext}
*/
const http = require('http');



module.exports = function (context, req, res) {
  
  console.log(context);
  
  var newsletter = context.data.newsletter ||  '2018_03_19_likitacao' ; 
  
  var url = 'https://res.cloudinary.com/evino/raw/upload/v1521468541/Newsletter/2018/03_marco/' + newsletter + '/index.html';
  
    var options = {
                    host: 'res.cloudinary.com',
                    port: 80,
                    path: url
                  };

              http.get(options, function(data) {
                     console.log("Got response: " + data.statusCode);
                     console.log("Got data: " + JSON.stringify(data,null,5) );
                     
                     var htmlData = 'foo';
                      res.writeHead(200, { 'Content-Type': 'text/html '});
                      res.end(htmlData);
              }).on('error', function(e) {
                console.log("Got error: " + e.message);
              });
               
};
