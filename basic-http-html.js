var request = require('request');
 

function doSomething(context,req,res){

  res.writeHead(200, { 'Content-Type': 'text/html '});
  res.end('<h1>Hello, world!</h1>');
  }

 module.exports = function(context, req,res) {
           doSomething(context,req,res);
};
